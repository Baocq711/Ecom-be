import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { Prisma } from '@prismaclient/index';

export const productsByCategory = (categoryId: string, query?: PaginationDto) => {
  const limit = query?.limit || 10;
  const page = query?.page || 1;
  const offset = (page - 1) * limit;
  // const orderByClause = Prisma.raw(`ORDER BY ${orderBy} ${orderDirection}`);

  return Prisma.sql`
    WITH RECURSIVE CategoryDescendants AS (
      -- Anchor member: select the starting category
      SELECT id
      FROM "Category"
      WHERE id = ${categoryId}::uuid

      UNION ALL

      -- Recursive member: select child categories
      SELECT c.id
      FROM "Category" c
      INNER JOIN CategoryDescendants cd ON c."parentId" = cd.id
    )
    SELECT
      p.id,
      p.name,
      p.slug,
      p.description,
      p.images,
      p.discount,
      p."discountType",
      p."isActive",
      p."categoryId",
      p."createdAt",
      p."updatedAt",
      p."deletedAt",
      (
        SELECT COALESCE(json_agg(
          json_build_object(
            'id', v.id,
            'size', v."size",
            'color', v."color",
            'material', v."material",
            'stock', v.stock,
            'price', v.price,
            'images', v.images, -- images của variant
            'isActive', v."isActive",
            'productId', v."productId",
            'createdAt', v."createdAt",
            'updatedAt', v."updatedAt",
            'deletedAt', v."deletedAt"
            -- Thêm các trường khác của variant nếu cần
          ) ORDER BY v.id ASC -- Tùy chọn: sắp xếp các variant trong mảng
        ), '[]'::json) -- Trả về mảng JSON rỗng nếu không có variant, thay vì NULL
        FROM "Variant" v
        WHERE v."productId" = p.id
          AND v."deletedAt" IS NULL -- Tùy chọn: chỉ lấy variant chưa bị xóa mềm
          -- AND v."isActive" = true -- Tùy chọn: chỉ lấy variant đang hoạt động
      ) AS variants
    FROM "Product" p
    WHERE p."categoryId" IN (SELECT id FROM CategoryDescendants)
    -- orderByClause -- Mệnh đề ORDER BY được chèn ở đây
    LIMIT ${limit}
    OFFSET ${offset};
  `;
};

export const countProductsByCategory = (categoryId: string) => {
  return Prisma.sql`
  WITH RECURSIVE CategoryDescendants AS (
    SELECT id
    FROM "Category"
    WHERE id = ${categoryId}::uuid
    UNION ALL
    SELECT c.id
    FROM "Category" c
    INNER JOIN CategoryDescendants cd ON c."parentId" = cd.id
  )
  SELECT COUNT(p.id) as "totalRecords"
  FROM "Product" p
  INNER JOIN "Category" cat ON p."categoryId" = cat.id
  WHERE cat.id IN (SELECT id FROM CategoryDescendants);
`;
};
