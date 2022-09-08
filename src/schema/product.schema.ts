/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
      // trim: true,
    },
    body_html: {
      type: String,
      required: false,
      // trim: true,
    },
    vendor: {
      type: String,
      required: true,
      // trim: true,
    },
    product_type: {
      type: String,
      required: true,
      // trim: true,
    },
    variants:{
      type: Object,
      required:true,
      option1:{
        type: String,
        required:true,
      },
      option2:{
        type: String,
        required:true,
      }
    },
    options:{
      type: Object,
      required:true,
      name:{
        type: String,
        required:true,
      },
      values:{
        type: Array,
        required:true,
      }
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
