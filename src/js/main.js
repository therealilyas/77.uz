import { categories } from "../../data/categories";
import { products } from "../../data/products";

const hideEl = (el, display = "block") => {
    if (display) {
      el.classList.remove(display);
    }
  
    el.classList.add("hidden");
  };
  
  const showEl = (el, display = "block") => {
    el.classList.remove("hidden");
  
    if (display) {
      el.classList.add(display);
    }
  };
  
  const getCateogryTemplate = (category, idx) => {
    return `
      <div
        class="category transition-all duration-200 rounded-xl border border-grey-4 hover:border-blue flex items-center gap-3 shadow-category py-[22px] pr-3 bg-white cursor-pointer group"
        data-index="${idx}"
        onclick="toggleDropdown(${idx})"
      >
        <div
          class="category__img border boder-gray-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] rounded-xl p-4 -ml-8 bg-white transition-all duration-200 group-hover:bg-blue group-hover:border-white/20"
        >
        <i class="${category.icon} icon-blue  text-blue-100 group-hover:icon-white text-2xl"></i>
          
        </div>
        <div class="flex-grow">
          <h3>${category.title}</h3>
          <p>${category.announcementCount} объявлений</p>
        </div>
        <i class="icon-chevron rotate-[-90deg]"></i>   </div>
    `;
  };
  
  const renderCatetories = () => {
    const categoriesSection = document.querySelector("section.categories");
  
    categories.forEach((category, idx) => {
      categoriesSection.innerHTML =categoriesSection.innerHTML +  getCateogryTemplate(category, idx);
    });
  };
  
  renderCatetories();
  
  const getSubcategoryTemplate = (subcategory) => {
    return `
      <a href="#" class="flex items-center justify-between gap-3 p-3">
        <h4>${subcategory.name}</h4>
       <i class="icon-chevron"></i>
      </a>
    `;
  };
  
  let activeIdx = null;
  
  const adjustDropdownPosition = (categoryIdx, dropdownContainer) => {
    const activeRow = Math.floor(categoryIdx / 3) + 2;
    dropdownContainer.style.gridRow = activeRow;
  };
  
  const toggleDropdownVisibility = (categoryIdx, dropdownContainer) => {
    if (dropdownContainer.classList.contains("hidden")) {
      showEl(dropdownContainer, "grid");
    } else if (activeIdx === categoryIdx) {
      hideEl(dropdownContainer, "grid");
    }
  };
  
  const renderSubcategories = (subcategories, dropdownContainer) => {
    dropdownContainer.innerHTML = subcategories
      ? subcategories.map(getSubcategoryTemplate).join("")
      : "Empty";
  };
  
  const toggleCategoryActive = (categoryIdx) => {
    const categories = document.querySelectorAll("section.categories .category");
  
    categories.forEach((c) => c.classList.remove("active"));
  
    if (activeIdx === categoryIdx) {
      categories[categoryIdx].classList.remove("active");  
    } else {
      categories[categoryIdx].classList.toggle("active");
    }
  };
  
  window.toggleDropdown = (categoryIdx) => {
    const subcategories = categories[categoryIdx].subcategories
  
    const dropdownContainer = document.querySelector(".subcategories-dropdown");
  
    adjustDropdownPosition(categoryIdx, dropdownContainer);
  
    toggleDropdownVisibility(categoryIdx, dropdownContainer);
  
    toggleCategoryActive(categoryIdx);
  
    renderSubcategories(subcategories, dropdownContainer);
  
    activeIdx = categoryIdx;
  };

// const categoriesGrid = document.getElementById("categoriesGrid");

// function createCategoryCard(category) {
// return `
// <div class="flex items-center justify-between p-4 w-[368px] h-[85px] relative bg-white rounded-2xl border border-gray-100 space-x-4 mr-10 mb-5 hover:shadow-lg transition-shadow duration-300">
// <div class="p-2 w-[64px] h-[64px] bg-white absolute left-[-20px] flex items-center justify-center border rounded-xl border-red-500" style="box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08); border-color: #EAEDF0;">
// <i class="${category.icon} text-blue-100 text-2xl"></i>
// </div>
// <div class="absolute left-[50px]">
// <h3 class="text-lg font-medium text-gray-900">${category.title}</h3>
// <p class="text-sm text-gray-500">${category.listings}</p>
// </div>
// <div class="ml-auto text-gray-400 absolute right-[12px] rotate-[-90deg]">
// <i class="icon-chevron"></i>
// </div>
// </div>
// `;
// }

// categories.forEach((category) => {
// categoriesGrid.innerHTML += createCategoryCard(category);
// });




function createProductCard(product) {
    return `
    
         <div class="w-full h-full bg-white rounded-lg shadow-md mt-10 group ">

<div class="relative">

 
<img src="/products/${product.image}" class="bg-[url('/products/${product.image}')] w-full h-[240px] rounded-t-[12px] object-cover hover:scale-105 transition-transform duration-300" alt="${product.name}">

      <i class="icon-heart text-4xl		 text-white absolute top-2 left-2 pt-[8px] pl-[8px] w-[120px] "></i>

</div>

<div class="p-4">

<div class="mt-3">
<span class="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
    ${product.location}
</span>
</div>

<h3 class="mt-2 text-black-100 group-hover:text-blue-600 font-semibold">
${product.name}
</h3>

<p class="text-gray-500 text-xs mt-1">${product.time}</p>

<p class="text-gray-200 font-medium text-sm mt-1">${product.phone}</p>

<div class="mt-3"><span class="text-2xl font-bold text-gray-900">${product.price}</span>

<span class="text-blue-600 text-sm font-semibold">UZS</span>
</div>

</div>
</div>
    `;
  }
  const productGrid = document.getElementById("product-grid");

  products.forEach((product) => {
    productGrid.innerHTML += createProductCard(product);
  });