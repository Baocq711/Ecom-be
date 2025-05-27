import { createSlug } from '@/helper/createSlug';
import {
  authModule,
  cartModule,
  fileModule,
  variantModule,
  crudModules,
  methods,
  actions,
  productModule,
  categoryModule,
} from '@i18ntypes/init/permission.init';
import { Method, Module, Prisma } from '@prismaclient/index';

export const initPermissions: Prisma.PermissionCreateManyInput[] = [
  ...crudModules.flatMap((module) =>
    methods.map(
      (method, index) =>
        ({
          name: `${actions[index]} ${module}`,
          method,
          module,
          path: `/${module.toLowerCase().replace('_', '-')}${index >= 2 ? '/:id' : ''}`,
        }) as Prisma.PermissionCreateManyInput,
    ),
  ),
  ...authModule,
  ...fileModule,
  ...cartModule,
  ...variantModule,
  ...productModule,
  ...categoryModule,
];

export const initProducts: Prisma.ProductCreateManyInput[] = [
  {
    name: 'Áo thun nam Basic',
    description: 'Áo thun cotton 100% thoáng mát, kiểu dáng đơn giản phù hợp mặc hàng ngày.',
    images: [
      'https://placehold.co/400x600?text=Áo+Thun+Nam+Basic+1',
      'https://placehold.co/400x600?text=Áo+Thun+Nam+Basic+2',
      'https://placehold.co/400x600?text=Áo+Thun+Nam+Basic+3',
    ],
    slug: createSlug('Áo thun nam Basic'),
  },
  {
    name: 'Đầm hoa nhí nữ cổ vuông',
    description: 'Thiết kế nữ tính với hoạ tiết hoa nhí, chất vải voan nhẹ, phù hợp đi chơi, dạo phố.',
    images: [
      'https://placehold.co/400x600?text=Đầm+Hoa+Nhi+Nữ+Cổ+Vuông+1',
      'https://placehold.co/400x600?text=Đầm+Hoa+Nhi+Nữ+Cổ+Vuông+2',
      'https://placehold.co/400x600?text=Đầm+Hoa+Nhi+Nữ+Cổ+Vuông+3',
    ],
    slug: createSlug('Đầm hoa nhí nữ cổ vuông'),
  },
  {
    name: 'Áo sơ mi nam trắng tay dài',
    description: 'Áo sơ mi form regular, dễ phối đồ, thích hợp đi học, đi làm.',
    images: [
      'https://placehold.co/400x600?text=Áo+Sơ+Mi+Nam+Trắng+Tay+Dài+1',
      'https://placehold.co/400x600?text=Áo+Sơ+Mi+Nam+Trắng+Tay+Dài+2',
      'https://placehold.co/400x600?text=Áo+Sơ+Mi+Nam+Trắng+Tay+Dài+3',
    ],
    slug: createSlug('Áo sơ mi nam trắng tay dài'),
  },
  {
    name: 'Quần jeans nam ống suông',
    description: 'Quần jeans xanh đậm, ống suông thời trang, co giãn nhẹ.',
    images: [
      'https://placehold.co/400x600?text=Quần+Jeans+Nam+Ống+Suông+1',
      'https://placehold.co/400x600?text=Quần+Jeans+Nam+Ống+Suông+2',
      'https://placehold.co/400x600?text=Quần+Jeans+Nam+Ống+Suông+3',
    ],
    slug: createSlug('Quần jeans nam ống suông'),
  },
  {
    name: 'Chân váy nữ xếp ly dài',
    description: 'Chân váy dài qua gối, chất liệu vải mềm rũ, phù hợp phong cách Hàn Quốc.',
    images: [
      'https://placehold.co/400x600?text=Chân+Váy+Nữ+Xếp+Ly+Dài+1',
      'https://placehold.co/400x600?text=Chân+Váy+Nữ+Xếp+Ly+Dài+2',
      'https://placehold.co/400x600?text=Chân+Váy+Nữ+Xếp+Ly+Dài+3',
    ],
    slug: createSlug('Chân váy nữ xếp ly dài'),
  },
  {
    name: 'Áo khoác nam bomber kaki',
    description: 'Áo khoác dáng bomber chất kaki, có lớp lót trong, giữ ấm tốt.',
    images: [
      'https://placehold.co/400x600?text=Áo+Khoác+Nam+Bomber+Kaki+1',
      'https://placehold.co/400x600?text=Áo+Khoác+Nam+Bomber+Kaki+2',
      'https://placehold.co/400x600?text=Áo+Khoác+Nam+Bomber+Kaki+3',
    ],
    slug: createSlug('Áo khoác nam bomber kaki'),
  },
  {
    name: 'Áo khoác nữ bomber kaki',
    description: 'Áo khoác dáng bomber chất kaki, có lớp lót trong, giữ ấm tốt.',
    images: [
      'https://placehold.co/400x600?text=Áo+Khoác+Nữ+Bomber+Kaki+1',
      'https://placehold.co/400x600?text=Áo+Khoác+Nữ+Bomber+Kaki+2',
      'https://placehold.co/400x600?text=Áo+Khoác+Nữ+Bomber+Kaki+3',
    ],
    slug: createSlug('Áo khoác nữ bomber kaki'),
  },
  {
    name: 'Áo thun nữ croptop',
    description: 'Croptop dáng ôm, chất thun lạnh co giãn, màu pastel nhẹ nhàng.',
    images: [
      'https://placehold.co/400x600?text=Áo+Thun+Nữ+Croptop+1',
      'https://placehold.co/400x600?text=Áo+Thun+Nữ+Croptop+2',
      'https://placehold.co/400x600?text=Áo+Thun+Nữ+Croptop+3',
    ],
    slug: createSlug('Áo thun nữ croptop'),
  },
  {
    name: 'Quần short kaki nam',
    description: 'Quần short nam kiểu dáng trẻ trung, có túi hai bên tiện lợi.',
    images: [
      'https://placehold.co/400x600?text=Quần+Short+Kaki+Nam+1',
      'https://placehold.co/400x600?text=Quần+Short+Kaki+Nam+2',
      'https://placehold.co/400x600?text=Quần+Short+Kaki+Nam+3',
    ],
    slug: createSlug('Quần short kaki nam'),
  },
  {
    name: 'Áo hoodie nam nỉ bông',
    description: 'Áo hoodie có mũ, chất nỉ bông dày dặn, giữ ấm mùa đông.',
    images: [
      'https://placehold.co/400x600?text=Áo+Hoodie+Nam+Nỉ+Bông+1',
      'https://placehold.co/400x600?text=Áo+Hoodie+Nam+Nỉ+Bông+2',
      'https://placehold.co/400x600?text=Áo+Hoodie+Nam+Nỉ+Bông+3',
    ],
    slug: createSlug('Áo hoodie nam nỉ bông'),
  },
  {
    name: 'Áo hoodie nữ nỉ bông',
    description: 'Áo hoodie có mũ, chất nỉ bông dày dặn, giữ ấm mùa đông.',
    images: [
      'https://placehold.co/400x600?text=Áo+Hoodie+Nữ+Nỉ+Bông+1',
      'https://placehold.co/400x600?text=Áo+Hoodie+Nữ+Nỉ+Bông+2',
      'https://placehold.co/400x600?text=Áo+Hoodie+Nữ+Nỉ+Bông+3',
    ],
    slug: createSlug('Áo hoodie nữ nỉ bông'),
  },
  {
    name: 'Đầm body nữ dự tiệc',
    description: 'Đầm body ôm sát, thiết kế cut-out sang trọng phù hợp tiệc tối.',
    images: [
      'https://placehold.co/400x600?text=Đầm+Body+Nữ+Dự+Tiệc+1',
      'https://placehold.co/400x600?text=Đầm+Body+Nữ+Dự+Tiệc+2',
      'https://placehold.co/400x600?text=Đầm+Body+Nữ+Dự+Tiệc+3',
    ],
    slug: createSlug('Đầm body nữ dự tiệc'),
  },
];

export const initVariants: Omit<Prisma.VariantCreateManyInput, 'productId'>[][] = [
  // Áo thun nam Basic
  [
    {
      color: 'Trắng',
      material: 'Cotton',
      price: 200000,
      size: 'S',
      stock: 33,
      images: [
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Trang+S+1',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Trang+S+2',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Trang+S+3',
      ],
    },
    {
      color: 'Đen',
      material: 'Cotton',
      price: 200000,
      size: 'M',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Den+M+1',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Den+M+2',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Den+M+3',
      ],
    },
    {
      color: 'Xám',
      material: 'Cotton',
      price: 200000,
      size: 'L',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Xam+L+1',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Xam+L+2',
        'https://placehold.co/400x600?text=Ao+Thun+Nam+Basic+Xam+L+3',
      ],
    },
  ],
  // Đầm hoa nhí cổ vuông
  [
    {
      color: 'Hồng',
      material: 'Voan',
      price: 450000,
      size: 'S',
      stock: 15,
      images: [
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Hong+S+1',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Hong+S+2',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Hong+S+3',
      ],
    },
    {
      color: 'Xanh',
      material: 'Voan',
      price: 450000,
      size: 'M',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Xanh+M+1',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Xanh+M+2',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Xanh+M+3',
      ],
    },
    {
      color: 'Be',
      material: 'Voan',
      price: 450000,
      size: 'L',
      stock: 17,
      images: [
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Be+L+1',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Be+L+2',
        'https://placehold.co/400x600?text=Dam+Hoa+Nhi+Be+L+3',
      ],
    },
  ],
  // Áo sơ mi trắng tay dài
  [
    {
      color: 'Trắng',
      material: 'Cotton',
      price: 350000,
      size: 'S',
      stock: 30,
      images: [
        'https://placehold.co/400x600?text=So+Mi+Trang+S+1',
        'https://placehold.co/400x600?text=So+Mi+Trang+S+2',
        'https://placehold.co/400x600?text=So+Mi+Trang+S+3',
      ],
    },
    {
      color: 'Trắng',
      material: 'Cotton',
      price: 350000,
      size: 'M',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=So+Mi+Trang+M+1',
        'https://placehold.co/400x600?text=So+Mi+Trang+M+2',
        'https://placehold.co/400x600?text=So+Mi+Trang+M+3',
      ],
    },
    {
      color: 'Trắng',
      material: 'Cotton',
      price: 350000,
      size: 'L',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=So+Mi+Trang+L+1',
        'https://placehold.co/400x600?text=So+Mi+Trang+L+2',
        'https://placehold.co/400x600?text=So+Mi+Trang+L+3',
      ],
    },
  ],
  // Quần jeans ống suông
  [
    {
      color: 'Xanh Đậm',
      material: 'Jean',
      price: 550000,
      size: '29',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+29+1',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+29+2',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+29+3',
      ],
    },
    {
      color: 'Xanh Đậm',
      material: 'Jean',
      price: 550000,
      size: '30',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+30+1',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+30+2',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+30+3',
      ],
    },
    {
      color: 'Xanh Đậm',
      material: 'Jean',
      price: 550000,
      size: '31',
      stock: 15,
      images: [
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+31+1',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+31+2',
        'https://placehold.co/400x600?text=Quan+Jean+Xanh+Dam+31+3',
      ],
    },
  ],
  // Chân váy xếp ly dài
  [
    {
      color: 'Đen',
      material: 'Vải Mềm',
      price: 400000,
      size: 'S',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Den+S+1',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Den+S+2',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Den+S+3',
      ],
    },
    {
      color: 'Nâu',
      material: 'Vải Mềm',
      price: 400000,
      size: 'M',
      stock: 18,
      images: [
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Nau+M+1',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Nau+M+2',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Nau+M+3',
      ],
    },
    {
      color: 'Be',
      material: 'Vải Mềm',
      price: 400000,
      size: 'L',
      stock: 15,
      images: [
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Be+L+1',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Be+L+2',
        'https://placehold.co/400x600?text=Chan+Vay+Xep+Ly+Be+L+3',
      ],
    },
  ],
  // Áo khoác bomber kaki
  [
    {
      color: 'Nâu',
      material: 'Kaki',
      price: 650000,
      size: 'M',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Bomber+Kaki+Nau+M+1',
        'https://placehold.co/400x600?text=Bomber+Kaki+Nau+M+2',
        'https://placehold.co/400x600?text=Bomber+Kaki+Nau+M+3',
      ],
    },
    {
      color: 'Đen',
      material: 'Kaki',
      price: 650000,
      size: 'L',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Bomber+Kaki+Den+L+1',
        'https://placehold.co/400x600?text=Bomber+Kaki+Den+L+2',
        'https://placehold.co/400x600?text=Bomber+Kaki+Den+L+3',
      ],
    },
    {
      color: 'Xanh Rêu',
      material: 'Kaki',
      price: 650000,
      size: 'XL',
      stock: 15,
      images: [
        'https://placehold.co/400x600?text=Bomber+Kaki+Xanh+Reu+XL+1',
        'https://placehold.co/400x600?text=Bomber+Kaki+Xanh+Reu+XL+2',
        'https://placehold.co/400x600?text=Bomber+Kaki+Xanh+Reu+XL+3',
      ],
    },
  ],
  // Áo thun nữ croptop
  [
    {
      color: 'Hồng Pastel',
      material: 'Thun Lạnh',
      price: 250000,
      size: 'S',
      stock: 30,
      images: [
        'https://placehold.co/400x600?text=Croptop+Hong+Pastel+S+1',
        'https://placehold.co/400x600?text=Croptop+Hong+Pastel+S+2',
        'https://placehold.co/400x600?text=Croptop+Hong+Pastel+S+3',
      ],
    },
    {
      color: 'Xanh Mint',
      material: 'Thun Lạnh',
      price: 250000,
      size: 'M',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Croptop+Xanh+Mint+M+1',
        'https://placehold.co/400x600?text=Croptop+Xanh+Mint+M+2',
        'https://placehold.co/400x600?text=Croptop+Xanh+Mint+M+3',
      ],
    },
    {
      color: 'Tím Pastel',
      material: 'Thun Lạnh',
      price: 250000,
      size: 'L',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Croptop+Tim+Pastel+L+1',
        'https://placehold.co/400x600?text=Croptop+Tim+Pastel+L+2',
        'https://placehold.co/400x600?text=Croptop+Tim+Pastel+L+3',
      ],
    },
  ],
  // Quần short kaki nam
  [
    {
      color: 'Be',
      material: 'Kaki',
      price: 350000,
      size: '29',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Short+Kaki+Be+29+1',
        'https://placehold.co/400x600?text=Short+Kaki+Be+29+2',
        'https://placehold.co/400x600?text=Short+Kaki+Be+29+3',
      ],
    },
    {
      color: 'Xám',
      material: 'Kaki',
      price: 350000,
      size: '30',
      stock: 30,
      images: [
        'https://placehold.co/400x600?text=Short+Kaki+Xam+30+1',
        'https://placehold.co/400x600?text=Short+Kaki+Xam+30+2',
        'https://placehold.co/400x600?text=Short+Kaki+Xam+30+3',
      ],
    },
    {
      color: 'Đen',
      material: 'Kaki',
      price: 350000,
      size: '31',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Short+Kaki+Den+31+1',
        'https://placehold.co/400x600?text=Short+Kaki+Den+31+2',
        'https://placehold.co/400x600?text=Short+Kaki+Den+31+3',
      ],
    },
  ],
  // Áo hoodie nỉ bông
  [
    {
      color: 'Đen',
      material: 'Nỉ Bông',
      price: 450000,
      size: 'M',
      stock: 30,
      images: [
        'https://placehold.co/400x600?text=Hoodie+Ni+Den+M+1',
        'https://placehold.co/400x600?text=Hoodie+Ni+Den+M+2',
        'https://placehold.co/400x600?text=Hoodie+Ni+Den+M+3',
      ],
    },
    {
      color: 'Xám',
      material: 'Nỉ Bông',
      price: 450000,
      size: 'L',
      stock: 25,
      images: [
        'https://placehold.co/400x600?text=Hoodie+Ni+Xam+L+1',
        'https://placehold.co/400x600?text=Hoodie+Ni+Xam+L+2',
        'https://placehold.co/400x600?text=Hoodie+Ni+Xam+L+3',
      ],
    },
    {
      color: 'Trắng',
      material: 'Nỉ Bông',
      price: 450000,
      size: 'XL',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Hoodie+Ni+Trang+XL+1',
        'https://placehold.co/400x600?text=Hoodie+Ni+Trang+XL+2',
        'https://placehold.co/400x600?text=Hoodie+Ni+Trang+XL+3',
      ],
    },
  ],
  // Đầm body dự tiệc
  [
    {
      color: 'Đen',
      material: 'Thun Co Giãn',
      price: 750000,
      size: 'S',
      stock: 20,
      images: [
        'https://placehold.co/400x600?text=Dam+Body+Den+S+1',
        'https://placehold.co/400x600?text=Dam+Body+Den+S+2',
        'https://placehold.co/400x600?text=Dam+Body+Den+S+3',
      ],
    },
    {
      color: 'Đỏ Đô',
      material: 'Thun Co Giãn',
      price: 750000,
      size: 'M',
      stock: 15,
      images: [
        'https://placehold.co/400x600?text=Dam+Body+Do+Do+M+1',
        'https://placehold.co/400x600?text=Dam+Body+Do+Do+M+2',
        'https://placehold.co/400x600?text=Dam+Body+Do+Do+M+3',
      ],
    },
    {
      color: 'Xanh Navy',
      material: 'Thun Co Giãn',
      price: 750000,
      size: 'L',
      stock: 10,
      images: [
        'https://placehold.co/400x600?text=Dam+Body+Xanh+Navy+L+1',
        'https://placehold.co/400x600?text=Dam+Body+Xanh+Navy+L+2',
        'https://placehold.co/400x600?text=Dam+Body+Xanh+Navy+L+3',
      ],
    },
  ],
];

export const initLevelOneCategories: Prisma.CategoryCreateManyInput[] = [
  {
    name: 'Nam',
    description: 'Thời trang dành cho nam giới',
    level: 1,
    slug: createSlug('Nam'),
  },
  {
    name: 'Nữ',
    description: 'Thời trang dành cho nữ giới',
    level: 1,
    slug: createSlug('Nữ'),
  },
];

export const initLevelTwoCategories: Prisma.CategoryCreateManyInput[] = [
  {
    name: 'Áo',
    description: 'Các loại áo thời trang',
    level: 2,
    slug: createSlug('Áo'),
  },
  {
    name: 'Quần',
    description: 'Các loại quần thời trang',
    level: 2,
    slug: createSlug('Quần'),
  },
  {
    name: 'Đầm',
    description: 'Các loại đầm thời trang',
    level: 2,
    slug: createSlug('Đầm'),
  },
  {
    name: 'Váy',
    description: 'Các loại váy thời trang',
    level: 2,
    slug: createSlug('Váy'),
  },
];
