import { productsCollection, reviewsCollection } from "./objectsCollection";

export const DEFAULT_TARGET = {
  product: {
    sources: ["Amazon", "MercadoLibre", "E-commerce"],
    collection: productsCollection,
  },
  reviews: {
    sources: ["Booking"],
    collection: reviewsCollection,
  },
};

export const DEFAULT_CRITERIA_OPERATIONS = ["order", "less than"];
