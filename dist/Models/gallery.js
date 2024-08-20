import mongoose, { Schema } from 'mongoose';
const GallerySchema = new Schema({
    photos: [{ type: String, required: true }]
});
const Gallery = mongoose.model('Gallery', GallerySchema);
export default Gallery;
