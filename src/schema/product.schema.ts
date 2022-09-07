/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    readOnly: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body_html: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    vendor: {
      type: String,
      required: true,
      trim: true,
    },
    product_type: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
