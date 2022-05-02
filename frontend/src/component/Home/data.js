import phone from './../../images/phone.jpg';
import laptop from './../../images/macbook.jpg';
import watch from './../../images/smart-watch.jpg';

import nike from './../../images/nike.jpg';
import puma from './../../images/puma.jpg';
import shoes3 from './../../images/shoes3.jpg';

export const offerOneData = {
    title: 'Travel Backpack',
    description: 'Our custom backbacks curated by designers from the wild jungles of guadeloupe.',
    btnText: 'Get 30% Off',
    img: 'https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}

export const offerTwoData = {
    title: 'Apple Phone',
    description: 'Our custom backbacks curated by designers from the wild jungles of guadeloupe.',
    btnText: 'Get 20% Off',
    img: phone
}

export const productData1 = [
    {
        name: 'Apple Watch',
        link: '/products',
        description: 'Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks, including making phone calls, sending text messages and reading email. ',
        title: 'Product',
        img: watch,
        brand: "APPLE"
    },
    {
        name: 'Apple MacBook Pro',
        link: '/products',
        description: 'Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels.',
        title: 'Product',
        img: laptop,
        brand: "APPLE"
    },
    {
        name: 'iPhone',
        link: '/products',
        description: 'The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.',
        title: 'Product',
        img: phone,
        brand: "APPLE"
    }
]

export const productData2 = [
    {
        name: 'Puma Shoes',
        link: '/products',
        description: 'Over the years, PUMA has stayed true to its four cornerstones: heritage, sport, technological innovation and design.',
        title: 'Product',
        img: puma,
        brand: "PUMA"
    },
    {
        name: 'Nike Shoes',
        link: '/products',
        description: "NIKE's description is NIKE, Inc., together with its subsidiaries, designs, develops, markets, and sells athletic footwear, apparel, equipment, and accessories worldwide.",
        title: 'Product',
        img: nike,
        brand: "NIKE"
    },
    {
        name: 'Shoes',
        link: '/products',
        description: 'A shoe is an item of footwear intended to protect and comfort the human foot. Shoes are also used as an item of decoration and fashion.',
        title: 'Product',
        img: shoes3,
        brand: "SHOES"
    }
]