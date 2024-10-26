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
    <div class="group">
      <div
        class="category transition-all duration-200 rounded-xl border border-grey-4 group-hover:bg-blue-100 group-hover:text-white group-hover:border-white/20 flex items-center gap-3 shadow-category py-[22px] pr-3 bg-white cursor-pointer"
        data-index="${idx}"
        onclick="toggleDropdown(${idx})"
      >
        <div
          class="group-hover:bg-blue-100 border boder-gray-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] rounded-xl p-4 -ml-8 bg-white transition-all duration-200 group-hover:bg-blue group-hover:border-white/20"
        >
        <i class="${category.icon} icon-blue  text-blue-100  group-hover:text-white text-2xl"></i>
          
        </div>
        <div class="flex-grow">
          <h3>${category.title}</h3>
          <p>${category.listings} объявлений</p>
        </div>
        <i class="icon-chevron rotate-[-90deg]"></i>   </div> </div>
    `;
};

const renderCatetories = () => {
  const categoriesSection = document.querySelector("div.categories");

  categories.forEach((category, idx) => {
    categoriesSection.innerHTML =
      categoriesSection.innerHTML + getCateogryTemplate(category, idx);
  });
};

renderCatetories();

const getSubcategoryTemplate = (subcategory) => {
  return `
      <a href="#" class="flex items-center justify-between font-semibold  gap-3 p-3 hover:text-blue-100 hover:font-bold transition duration-200 ">
        <h4>${subcategory.name}</h4>
        <i class="icon-chevron rotate-[-90deg]"></i>
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
  const subcategories = categories[categoryIdx].subcategories;

  const dropdownContainer = document.querySelector(".subcategories-dropdown");

  adjustDropdownPosition(categoryIdx, dropdownContainer);

  toggleDropdownVisibility(categoryIdx, dropdownContainer);

  toggleCategoryActive(categoryIdx);

  renderSubcategories(subcategories, dropdownContainer);

  activeIdx = categoryIdx;
};

function createProductCard(product) {
  return `
    
         <div class="w-full h-full bg-white rounded-lg shadow-md mt-10 group ">

<div class="relative ">

 
<img src="/products/${product.image}" class="bg-[url('/products/${product.image}')] w-full h-[240px] rounded-t-[12px] object-cover" alt="${product.name}">

      <i class="icon-heart text-4xl		 text-white absolute top-2 left-2 pt-[8px] pl-[8px] w-[120px] "></i>

</div>

<div class="p-4">

<div class="mt-3">
<span class="inline-block bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-white text-xs font-medium px-2 py-1 rounded">
    ${product.location}
</span>
</div>

<h3 class="mt-2 text-black-100 group-hover:text-blue-600 font-semibold">
${product.name}
</h3>

<p class="text-gray-500 text-xs mt-1">${product.time}</p>

<p class="text-gray-200 font-medium text-sm mt-1">${product.phone}</p>

<div class="mt-3"><span class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 ">${product.price}</span>

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

document.addEventListener("DOMContentLoaded", function () {
  const languageButton = document.getElementById("language-button");
  const languageDropdown = document.getElementById("language-dropdown");
  const languageFlag = document.getElementById("language-flag");

  languageButton.addEventListener("click", function () {
    languageDropdown.classList.toggle("show");
  });

  languageDropdown.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedLanguage = event.target.getAttribute("data-lang");
      const selectedFlag = event.target.getAttribute("data-flag");

      languageButton.querySelector("span").textContent = selectedLanguage;
      languageFlag.src = selectedFlag;

      languageDropdown.classList.remove("show");
      console.log("Language selected:", selectedLanguage);
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !languageButton.contains(event.target) &&
      !languageDropdown.contains(event.target)
    ) {
      languageDropdown.classList.remove("show");
    }
  });
});




const searchInputEl = document.querySelector(".search-input");
const dropdownWrapper = document.querySelector(".dropdown-wrapper");

let isSearchOpened = false;


searchInputEl.addEventListener('click', () => {
    isSearchOpened = !isSearchOpened;

    if (isSearchOpened) {
        dropdownWrapper.classList.remove('hidden');
        dropdownWrapper.classList.add('opacity-100');
    } else {
        dropdownWrapper.classList.add('hidden');
        dropdownWrapper.classList.remove('opacity-100');
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("openLoginModal");
  const closeModalButton = document.getElementById("closeLoginModal");
  const loginModal = document.getElementById("loginModal");

  // Open Modal
  openModalButton.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });

  // Close Modal
  closeModalButton.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });

  // Close Modal by clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add("hidden");
    }
  });
});
