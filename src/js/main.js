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
        class="category transition-all duration-200 rounded-xl border border-grey-4 group-hover:border-blue-100  group-hover:border-1 flex items-center gap-3 shadow-category py-[22px] pr-3 bg-white cursor-pointer"
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
        <i class="icon-chevron rotate-[-90deg] relative  group-hover:text-blue-100 group-hover:text-lg"></i>   </div> </div>
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

      <i class="icon-heart text-4xl font-light	text-white absolute top-2 left-2 pt-[8px] pl-[8px] w-[120px] "></i>

</div>

<div class="p-4">

<div class="mt-3">
<span class="inline-block bg-gray-100 text-gray-600  text-xs font-medium px-2 py-1 rounded">
    ${product.location}
</span>
</div>

<h3 class="mt-2 text-black-100 group-hover:text-blue-600 font-semibold">
${product.name}
</h3>

<p class="text-gray-500 text-xs mt-1">${product.time}</p>

<p class="text-gray-200 font-medium text-sm mt-1">${product.phone}</p>

<div class="mt-3"><span class="text-2xl font-bold text-gray-900 ">${product.price}</span>

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
const dropdownWrapperModal = document.querySelector(".dropdown-wrapper-modal");

let isSearchOpened = false;

searchInputEl.addEventListener("click", (event) => {
  event.stopPropagation();
  isSearchOpened = true;
  dropdownWrapper.classList.remove("hidden", "opacity-0");
  dropdownWrapper.classList.add("opacity-100");
  dropdownWrapperModal.classList.remove("hidden");
});


dropdownWrapperModal.addEventListener("click", closeDropdown);

function closeDropdown() {
  isSearchOpened = false;
  dropdownWrapper.classList.add("hidden", "opacity-0");
  dropdownWrapper.classList.remove("opacity-100");
  dropdownWrapperModal.classList.add("hidden");
}




document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("openLoginModal");
  const closeModalButton = document.getElementById("closeLoginModal");
  const loginModal = document.getElementById("loginModal");

  openModalButton.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });

  closeModalButton.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const applicationModal = document.getElementById("applicationModal");
  const applyButton = document.querySelector(
    'button:contains("Подать заявку")'
  );
  const closeApplicationModal = document.getElementById(
    "closeApplicationModal"
  );

  applyButton.addEventListener("click", (e) => {
    e.preventDefault();
    applicationModal.classList.remove("hidden");
  });

  closeApplicationModal.addEventListener("click", () => {
    applicationModal.classList.add("hidden");
  });

  applicationModal.addEventListener("click", (e) => {
    if (e.target === applicationModal) {
      applicationModal.classList.add("hidden");
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === applicationModal) {
      applicationModal.classList.add("hidden");
    }
  });
});


const modalPass = document.getElementById("forgotPassModal");
const forgotPasswordBtn = document.getElementById("forgotPassword");
const closeModalBtn = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");

forgotPasswordBtn.addEventListener("click", () => {
  modalPass.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modalPass.classList.add("hidden");
});

const submitApplication = document.getElementById("submitApplication");
const submitAppModal = document.getElementById("applicationModal");

submitApplication.addEventListener("click", () => {
  submitAppModal.classList.remove("hidden");
  loginForm.classList.add("hidden");
});


window.addEventListener("click", (e) => {
    if (!searchInputEl.contains(event.target) && !dropdownWrapper.contains(event.target)) {
      closeDropdown();
    }
  
  if (e.target === applicationModal) {
    applicationModal.classList.add("hidden");
  }
  if (e.target === modalPass) {
    modalPass.classList.add("hidden");
  }
  if (e.target === submitAppModal) {
    submitAppModal.classList.remove("hidden");
  }
});

RegExp.escape = function (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

window.addEventListener("load", function () {
  const wrapper = (match) =>
    `<span style="background-color: yellow;">${match}</span>`;
  const term = document.querySelector(".search-input");
  const list = document.getElementById("ul-id");
  const items = list.querySelectorAll("li:not(:first-child)");
  const source = Array.from(items, (li) =>
    li.querySelector("span").textContent.trim()
  );

  const cmp = (a, b) => b.length - a.length;

  const delay = (fn, ms) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  term.addEventListener(
    "keyup",
    delay(function () {
      const query = this.value.trim();
      if (query) {
        const words = query.match(/[^ ]+/g).sort(cmp).map(RegExp.escape);
        const re = new RegExp(words.join("|"), "gi");

        items.forEach((item, index) => {
          const originalText = source[index];
          const highlighted = originalText.replace(re, wrapper);
          item.querySelector("span").innerHTML = highlighted;
          item.style.display = "flex";
        });
      } else {
        items.forEach((item, index) => {
          item.querySelector("span").textContent = source[index];
          item.style.display = "none";
        });
      }
    }, 300)
  );
});
