const Food = [
  {
    url : 'https://m.media-amazon.com/images/I/515Ueeh4ylL._AC_UF1000,1000_QL80_.jpg',
    title : 'Jalebi',
    class: 'Indian',
    price : 30
  },
  {
      url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA20wuzQKIS_orWdQPVd4UzqjETJZ2BFc9w&s',
      title : 'Halwa',
      class: 'Indian',
      price : 40
    },
    {
      url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdjU_8zlouDLWSyDd0bGB0ynAoRFfas_1Blw&s',
      title : 'Chhola Bhatura',
      class: 'Indian',
      price : 50
    },
    {
      url : 'https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg',
      title : 'Samosa',
      class: 'Indian',
      price : 30
    },
    {
        url : 'https://c.ndtvimg.com/2019-04/fu9tv9uo_chhole-bhature_625x300_11_April_19.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886',
        title : 'Chhole Bhature',
        class: 'Indian',
        price : 40
      },
      {
        url : 'https://www.cookingwithsiddhi.com/wp-content/uploads/2017/12/lauki-pyaz-ke-pakode.jpg',
        title : 'Pyaz ke Pakode',
        class: 'Indian',
        price : 70
      },
      {
        url : 'https://m.media-amazon.com/images/I/81jFn9F6SHL._AC_UF1000,1000_QL80_.jpg',
        title : 'Fafda',
        class: 'Recommended',
        price : 30
      },
      {
          url : 'https://www.cookwithnabeela.com/wp-content/uploads/2024/02/GulabJamun2-.webp',
          title : 'Gulaab jamun',
          class: 'Indian',
          price : 40
      },
      {
      url : 'https://www.shutterstock.com/image-photo/tiramisu-cake-mint-cocoa-260nw-1901750020.jpg',
      title : 'Tiramisu',
      class: 'Italian',
      price : 20
      },
      {
          url : 'https://nomoneynotime.com.au/uploads/recipes/shutterstock_2042520416-1.jpg',
          title : 'Pizza',
          class: 'Recommended',
          price : 70
      },
      {
          url : 'https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg',
          title : 'Pasta',
          class: 'Italian',
          price : 70
      },
        {
          url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8HC6HMLhBnUUcBbE1smE5tKpo0BMtUdz4w&s',
          title : 'Risottp Milanese',
          class: 'Italian',
          price : 70
        },
        {
          url : 'https://www.vickery.tv/wp-content/uploads/2020/12/SMGD-Spaghetti-Bolognese.jpg',
          title : 'Spaghetti B',
          class: 'Italian',
          price : 70
        },
        {
          url : 'https://www.shutterstock.com/image-photo/bruschetta-ricotto-cheese-cherry-tomatoes-600nw-2288779627.jpg',
          title : 'Bruschetta',
          class: 'Italian',
          price : 70
        },
        {
          url : 'https://media.istockphoto.com/id/1207374655/photo/homemade-classic-arancini-di-riso-crispy-sicilian-rice-balls-stuffed-with-mozzarella-cheese.jpg?s=612x612&w=0&k=20&c=0I_gbqgwNDPe8ATKXXQ_Jq2Jf1w8qtBtEUUdXayC5Hs=',
          title : 'Arancini',
          class: 'Recommended',
          price : 70
        },
        {
          url : 'https://t3.ftcdn.net/jpg/01/00/52/14/360_F_100521407_15ViliDWGLkB1N6Lwh5DQg9MePJa5tbw.jpg',
          title : 'Lasagna',
          class: 'Italian',
          price : 70
        },
        {
          url : 'https://www.awesomecuisine.com/wp-content/uploads/2007/11/Idli-with-sambar-and-chutney.jpg',
          title : 'Idli',
          class: 'South-Indian',
          price : 70
        },
        {
          url : 'https://www.shutterstock.com/image-photo/south-indian-plate-mandu-vada-260nw-2330396775.jpg',
          title : 'Vada',
          class: 'South-Indian',
          price : 40
        },
        {
          url : 'https://media.istockphoto.com/id/909906350/photo/masala-dosa-south-indian-food.jpg?s=612x612&w=0&k=20&c=3CI-bw2NhYaX_t0-CZIXIIXsOygFcUaoGSmzbnVB-fU=',
          title : 'Dosa',
          class: 'South-Indian',
          price : 40
        },
        {
          url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6xDbJ46WdVvVO_7P7F19YjKNpGeXLXm2xw&s',
          title : 'Puttu',
          class: 'Recommended',
          price : 40
        },
        {
          url : 'https://revi.b-cdn.net/wp-content/uploads/2017/02/cashew-murukku-main.jpg',
          title : 'Murukku',
          class: 'South-Indian',
          price : 40
        },
        {
          url : 'https://www.jeyashriskitchen.com/wp-content/uploads/2021/08/IMG_0640.jpg',
          title : 'Appam',
          class: 'South-Indian',
          price : 40
        },
        {
          url : 'https://www.seriouseats.com/thmb/syRT544tlIDwO_wpCc0N7ey9w4Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__05__20121405-Sooji-Upma-20Indian-Breakfast-21e04a2320de433eb5906cb71caa2b70.jpg',
          title : 'Upma',
          class: 'South-Indian',
          price : 40
        },
        {
          url : 'https://static.toiimg.com/photo/53376135.cms',
          title : 'Mysore Pak',
          class: 'South-Indian',
          price : 40
        },
        {
            url : 'https://lifemadesweeter.com/wp-content/uploads/Easy-Vegetable-Lo-Mein-Recipe-Healthy-Noodles-500x500.jpg',
            title : 'Veg Noodles',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTRtTdUJ7JXdvMZKyW0XSIv1cNLrSrMbwf1A&s',
            title : "Buddha Delight",
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://www.kitchensanctuary.com/wp-content/uploads/2023/10/Vegetable-Spring-Rolls-square-FS.jpg',
            title : 'Vegatable Roll',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://media.istockphoto.com/id/1133151212/photo/japanese-dumplings-gyoza-with-pork-meat-and-vegetables.jpg?s=612x612&w=0&k=20&c=vC6GTUDGK6dD5_QHvY1V7fVUdPx-z4TG73DUACR_L5s=',
            title : 'Dumplings',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqKxlMKi__TLnGXEuBpeYZLiB5ee4ueGNTA&s',
            title : 'Mapo Tofu',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://media.istockphoto.com/id/1477739528/photo/poached-spicy-slices-of-pork-chinese-food-sichuan-food-delicious.jpg?s=612x612&w=0&k=20&c=eOcSicRLqtntgZtubm817DYm2H6Ovy21U-cUTMO6E0E=',
            title : 'Sichuan',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg',
            title : 'Vegetable Rice',
            class: 'Chinese',
            price : 40
          },
          {
            url : 'https://www.shutterstock.com/image-photo/delicious-baozi-chinese-steamed-meat-260nw-1886492500.jpg',
            title : 'Baozi',
            class: 'Chinese',
            price : 40
          },
         
]
export default Food;