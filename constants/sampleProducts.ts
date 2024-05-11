export const sampleProducts = [
  {
    id: "phones",
    name: "Mobile Phones",
    description: "Latest smartphones from top brands.",
    children: [
      {
        id: "apple",
        name: "Apple",
        description: "Innovative iPhones by Apple.",
        children: [
          {
            id: "iphone_8",
            name: "iPhone 8",
            children: [
              { id: "iphone_8_64gb", name: "64GB" },
              { id: "iphone_8_128gb", name: "128GB" },
              { id: "iphone_8_256gb", name: "256GB" },
              { id: "iphone_8_512gb", name: "512GB" },
            ],
          },
          {
            id: "iphone_x",
            name: "iPhone X",
            children: [
              { id: "iphone_x_64gb", name: "64GB" },
              { id: "iphone_x_128gb", name: "128GB" },
              { id: "iphone_x_256gb", name: "256GB" },
              { id: "iphone_x_512gb", name: "512GB" },
            ],
          },
        ],
      },
      {
        id: "samsung",
        name: "Samsung",
        description: "Cutting-edge smartphones from Samsung.",
        children: [
          {
            id: "galaxy_s10",
            name: "Galaxy S10",
            children: [
              { id: "galaxy_s10_64gb", name: "64GB" },
              { id: "galaxy_s10_128gb", name: "128GB" },
            ],
          },
          {
            id: "galaxy_note_10",
            name: "Galaxy Note 10",
            children: [
              { id: "galaxy_note_10_256gb", name: "256GB" },
              { id: "galaxy_note_10_512gb", name: "512GB" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "watches",
    name: "Smartwatches",
    description: "Stay connected with these stylish smartwatches.",
    children: [
      {
        id: "apple_watch",
        name: "Apple Watch",
        description: "Revolutionary smartwatches by Apple.",
        children: [
          {
            id: "apple_watch_series_6",
            name: "Series 6",
            children: [
              { id: "apple_watch_42mm", name: "42mm" },
              { id: "apple_watch_44mm", name: "44mm" },
              { id: "apple_watch_48mm", name: "48mm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "computers",
    name: "Computers",
    description: "High-performance computers for work and play.",
    children: [
      {
        id: "apple_computers",
        name: "Apple PC",
        description: "Efficient and elegant computers by Apple.",
        children: [
          {
            id: "macbook_air",
            name: "MacBook Air",
            children: [
              { id: "macbook_air_128gb_ssd", name: "128GB SSD" },
              { id: "macbook_air_256gb_ssd", name: "256GB SSD" },
              { id: "macbook_air_512gb_ssd", name: "512GB SSD" },
            ],
          },
          {
            id: "macbook_pro",
            name: "MacBook Pro",
            children: [
              { id: "macbook_pro_13_inch", name: "13-inch" },
              { id: "macbook_pro_15_inch", name: "15-inch" },
            ],
          },
        ],
      },
      {
        id: "dell",
        name: "Dell",
        description: "Reliable and powerful computers from Dell.",
        children: [
          {
            id: "xps_13",
            name: "XPS 13",
            children: [
              { id: "xps_13_512gb_ssd", name: "512GB SSD" },
              { id: "xps_13_1tb_ssd", name: "1TB SSD" },
            ],
          },
          {
            id: "inspiron_15",
            name: "Inspiron 15",
            children: [
              { id: "inspiron_15_256gb_ssd", name: "256GB SSD" },
              { id: "inspiron_15_512gb_ssd", name: "512GB SSD" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "clothes",
    name: "Clothes",
    description: "Amazing clothes",
  },
];
