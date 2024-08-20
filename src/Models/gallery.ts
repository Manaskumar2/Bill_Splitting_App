import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
    photos: string[];
}

const GallerySchema: Schema = new Schema({
    photos: [{ type: String, required: true }]
});

const Gallery = mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
