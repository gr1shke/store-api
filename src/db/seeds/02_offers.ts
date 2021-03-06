import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('offers').del();

  // Inserts seed entries
  await knex('offers').insert([
    {
      name: 'ПК HP Slim Desktop S01-aF1000ur [304N3EA]',
      price: 17999,
      description:
        'ПК HP Slim Desktop S01-aF1000ur представляет собой компактное и функциональное решение для дома и офиса. Данная модель выполнена в прочном металлическом корпусе формата Tower и отличается строгим дизайном, благодаря чему легко сможет дополнить собой практически любой интерьер.',
      category_id: 9,
    },
    {
      name: 'ПК Acer Aspire XC-830 [DT.BE8ER.003]',
      price: 18999,
      description:
        'Компьютер Acer Aspire XC-830 - это продуманный дизайн и мощные аппаратные средства, которые предназначены для продуктивной работы в режиме многозадачности. Модель имеет стильный корпус и может устанавливаться на видном месте, являясь отличным дополнением к дизайну интерьера.',
      category_id: 9,
    },
    {
      name: '14" Ноутбук Lenovo V14 IGL серый',
      price: 18699,
      description:
        'Этот ноутбук создан для тех, кто хочет получить хорошее производительное компьютерное устройство с наиболее востребованным функционалом. Данная модель полностью удовлетворяет данные требования.',
      category_id: 10,
    },
    {
      name: '11.6" Ноутбук ASUS Laptop E210MA-GJ002T',
      price: 19799,
      description:
        'Оснащенный 11.6-дюймовым экраном ноутбук ASUS Laptop E210MA-GJ003T отличается конструктивным исполнением тачпада, который можно использовать в роли цифрового блока клавиатуры. Корпус модели может раскладываться на 180°.',
      category_id: 10,
    },
    {
      name: 'Процессор AMD FX-4300 OEM',
      price: 2150,
      description:
        'Четырехъядерный «народный процессор» AMD FX-4300 OEM, способный работать в четыре потока, позволяет насладиться преимуществами параллельных вычислений в полном объеме.',
      category_id: 11,
    },
    {
      name: 'Процессор Intel Celeron G5905 OEM',
      price: 3799,
      description:
        'Процессор Intel Celeron G5905 OEM представляет собой решение начального уровня, которое станет отличным выбором для домашних и офисных компьютеров.',
      category_id: 11,
    },
    {
      name: 'Плата GIGABYTE LGA1151-v2 H310 H310M S2 2xDDR4 1xPCI-Ex16 Dsub SATA3 USB3.1 mATX',
      price: 3199,
      description: 'Плата GIGABYTE LGA1151-v2 H310 H310M S2 2xDDR4 1xPCI-Ex16 Dsub SATA3 USB3.1 mATX',
      category_id: 12,
    },
    {
      name: 'Материнская плата MSI A320M-A PRO',
      price: 3499,
      description:
        'Соответствующая форм-фактору Micro-ATX материнская плата MSI A320M-A PRO отличается компактностью: габаритные размеры устройства составляют 226x187 мм.',
      category_id: 12,
    },
    {
      name: '19.5" Монитор Philips 203V5LSB26',
      price: 7850,
      description:
        'Монитор Philips 203V5LSB26 с диагональю 19.5" – это устройство, оснащенное программным обеспечением SmartControl Lite, которое создано для простого управления монитором и настройки всех его параметров.',
      category_id: 13,
    },
    {
      name: '18.5" Монитор AOC E970SWN',
      price: 9349,
      description:
        'Монитор AOC e970Swn/01 с диагональю 18.5" отличается компактностью и функциональностью. Устройство станет отличной составляющей Вашего рабочего компьютера.',
      category_id: 13,
    },
    {
      name: 'Клавиатура проводная A4Tech Fstyler FKS11',
      price: 899,
      description:
        'Клавиатура A4Tech Fstyler FKS11 является идеальным устройством для учебы и работы. Ее конструкция предполагает наличие 86 клавиш, позволяющих выполнять основную работу с комфортом.',
      category_id: 14,
    },
    {
      name: 'Клавиатура проводная Logitech G213 Prodigy',
      price: 3799,
      description:
        'Клавиатура Logitech G213 Prodigy – это игровой аксессуар, чья эргономика и функционал продуманы так, чтобы вы могли с успехом выходить в лидеры виртуальных баталий.',
      category_id: 14,
    },
    {
      name: 'Холодильник компактный Бирюса M50',
      price: 6899,
      description:
        'Холодильник Бирюса M50 класса «А+» обеспечивает низкое потребление электроэнергии и оснащен надежной системой капельного охлаждения.',
      category_id: 15,
    },
    {
      name: 'Холодильник компактный NORDFROST NR 402 E',
      price: 8399,
      description:
        'Холодильник компактный NORDFROST NR 402 E в бежевом цветовом исполнении отличается совсем небольшими размерами корпуса и может быть установлен на кухне малого метража, на даче, в гостиничном номере.',
      category_id: 15,
    },
    {
      name: 'Электрическая варочная поверхность Beko HDCE32200X',
      price: 6999,
      description:
        'Электрическая варочная поверхность Beko HDCE32200X - мощная двухконфорочная модель с лаконичным дизайном и компактными размерами.',
      category_id: 16,
    },
    {
      name: 'Электрическая варочная поверхность Zigmund & Shtain CN 36.3 B',
      price: 7250,
      description:
        'Место для электрической варочной поверхности Zigmund & Shtain CN 36.3 B найдется на любой кухне, даже самой маленькой.',
      category_id: 16,
    },
    {
      name: 'Стиральная машина Indesit IWUD 4085',
      price: 14999,
      description:
        'Стиральная машина INDESIT IWUD 4085 оснащена электроприводом, что позволяет существенно сократить траты электроэнергии и воды, а также уменьшить шумовой эффект от работы до минимума.',
      category_id: 17,
    },
    {
      name: 'Стиральная машина Candy AQUA 1D1035-07',
      price: 16999,
      description:
        'Классическая стиральная машина Candy AQUA 1D1035-07 фронтального типа загрузки станет хорошим приобретением для тех покупателей, которые ищут малогабаритную полноразмерную модель.',
      category_id: 17,
    },
    {
      name: 'Пылесос Endever SkyClean VC-291',
      price: 960,
      description:
        'С пылесосом ENDEVER SKYCLEAN VC-291 поддерживать оптимальную чистоту салона станет еще проще. Ведь этот пылесос отличают малые габариты (420x105x105 мм), универсальность и удобство использования.',
      category_id: 18,
    },
    {
      name: 'Пылесос Kitfort КТ-537-3',
      price: 1099,
      description:
        'Пылесос Kitfort КТ-537-3 представляет собой надежный прибор для уборки в автомобиле. Он работает от энергии авто: подключившись к прикуривателю, вы сможете получить достаточно энергии для того, чтобы очистить салон автомобиля от мусора и грязи.',
      category_id: 18,
    },
    {
      name: 'Фен Aresa AR-3209',
      price: 800,
      description:
        'Фен Aresa AR-3209 – мощный аппарат для сушки волос, который выполнен в удобном полноразмерном корпусе.',
      category_id: 19,
    },
    {
      name: 'Фен Rowenta CV1602F0',
      active: false,
      price: 899,
      description:
        'Фен Rowenta CV 1602 - все, что нужно девушке, чтобы быстро высушить волосы и аккуратно уложить их. Модель оборудована сетевым шнуром, длина которого равняется 1.8 м.',
      category_id: 19,
    },
    {
      name: 'Машинка для стрижки ENERGY EN-734',
      price: 399,
      description:
        'Машинка для стрижки ENERGY EN-734 – простой прибор, способный помочь домашнему мастеру или профессионалу, не стремящемуся произвести впечатление на клиентов премиальной техникой.',
      category_id: 20,
    },
    {
      active: false,
      name: 'Машинка для стрижки Andis 12480 MLC',
      price: 20299,
      description:
        'Машинка для стрижки Andis 12480 MLC Master Cordless Li ion - отличный способ сделать оригинальную стрижку в домашних условиях, не переплачивая за дорогостоящие услуги парикмахера.',
      category_id: 20,
    },
  ]);
}
