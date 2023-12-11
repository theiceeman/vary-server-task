import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class extends BaseSeeder {
  public async run() {
    await Book.createMany([
      {
        title: "gimme more",
        writer: "britney spears.",
        cover_image: "https://images-na.ssl-images-amazon.com/images/I/61BWsc9eGbL._AC_UL254_SR254,254_.jpg",
        price: "7.99",
        tags: "goth, crime, adventure"
      },
      {
        title: "hell & heaven",
        writer: "dan brown.",
        cover_image: "https://images-na.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/I/71CX11nGhWL._AC_UL381_SR381,381_.jpg",
        price: "5.99",
        tags: "goth, adventure"
      },
      {
        title: "No Brainer (Diary of a Wimpy Kid Book 18)",
        writer: "dan brown.",
        cover_image: "https://images-na.ssl-images-amazon.com/images/I/91a0G7UE5YL._AC_UL381_SR381,381_.jpg",
        price: "5.99",
        tags: "romance, kids"
      },
      {
        title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        writer: "dan brown.",
        cover_image: "https://images-na.ssl-images-amazon.com/images/I/713UXYBviuL._AC_UL381_SR381,381_.jpg",
        price: "5.99",
        tags: "self help, motivation"
      },
      {
        title: "Baking Yesteryear: The Best Recipes from the 1900s to the 1980s",
        writer: "dan brown.",
        cover_image: "https://images-na.ssl-images-amazon.com/images/I/91jwRAg09EL._AC_UL254_SR254,254_.jpg",
        price: "5.99",
        tags: "cooking, lifestyle"
      }
    ])
  }
}
