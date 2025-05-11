import { UserRepository } from '@/shared/repositories/user.repository';
import { RefreshTokenRepository } from '@/shared/repositories/refreshToken.repository';
import { OtpRepository } from '@/shared/repositories/otp.repository';
import { RoleRepository } from '@/shared/repositories/role.repository';
import { PermissionRepository } from '@/shared/repositories/permission.repository';
import { ProductRepository } from '@/shared/repositories/product.repository';
import { VariantRepository } from '@/shared/repositories/variant.repository';
import { CartRepository } from '@/shared/repositories/cart.repository';
import { CartItemRepository } from '@/shared/repositories/cart-item.repository';
import { OrderRepository } from '@/shared/repositories/order.repository';
import { CategoryRepository } from '@/shared/repositories/category.repository';
const repositories = [
  UserRepository,
  RefreshTokenRepository,
  OtpRepository,
  RoleRepository,
  PermissionRepository,
  ProductRepository,
  VariantRepository,
  CartRepository,
  CartItemRepository,
  OrderRepository,
  CategoryRepository,
] as const;
export default repositories;
