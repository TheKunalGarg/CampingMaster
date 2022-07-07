const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c6e7c567ddc60c5e9fc4d0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    // url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    // url: 'https://res.cloudinary.com/dzjhe8pnk/image/upload/v1657209842/istockphoto-911995140-612x612_tewpyu.jpg',
                    // filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                    url: 'https://res.cloudinary.com/dzjhe8pnk/image/upload/v1657211597/YelpCamp/vozwnmcqixsorax3m5oq.jpg',
                    filename: 'YelpCamp/vozwnmcqixsorax3m5oq'
                },
                {
                    // url: 'https://res.cloudinary.com/dzjhe8pnk/image/upload/v1657209842/istockphoto-911995140-612x612_tewpyu.jpg',

                    // url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    // filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                    url: 'https://res.cloudinary.com/dzjhe8pnk/image/upload/v1657211597/YelpCamp/qbqhatlgeyxvdq0112tf.jpg',
                    filename: 'YelpCamp/qbqhatlgeyxvdq0112tf'

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})