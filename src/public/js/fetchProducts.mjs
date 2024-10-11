document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container");

  // Function to fetch products from the API
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:8080/api/products?page=1");
      const data = await response.json();
      // console.log(data.products.docs);
      renderProducts(data.products.docs);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Function to render products using plain JavaScript
  function renderProducts(products) {
    productContainer.innerHTML = ""; // Clear existing products

    products.forEach((product) => {
      const productElement = document.createElement("a");
      productElement.href = "#";
      productElement.className = "group";

      const imageContainer = document.createElement("div");
      imageContainer.className =
        "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7";

      const image = document.createElement("img");
      // image.src = product.image;
      image.src = "/img/gatito.jpg";
      image.alt = product.title;
      image.className =
        "h-full w-full object-cover object-center group-hover:opacity-75";

      imageContainer.appendChild(image);

      const nameElement = document.createElement("h3");
      nameElement.className = "mt-4 text-sm text-gray-700";
      nameElement.textContent = product.title;

      const priceElement = document.createElement("p");
      priceElement.className = "mt-1 text-lg font-medium text-gray-900";
      priceElement.textContent = `$${product.price}`;

      productElement.appendChild(imageContainer);
      productElement.appendChild(nameElement);
      productElement.appendChild(priceElement);

      productContainer.appendChild(productElement);
    });
  }

  // Fetch products on page load
  fetchProducts();
});
