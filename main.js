// Global products data
const products = {
  '1': {
    id: '1',
    name: 'MacBook Pro 2024',
    price: 1099.99,
    oldPrice: 1299.99,
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 42,
    description: 'The latest MacBook Pro with powerful processing capabilities and stunning display.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500'
  },
  '11': {
    id: '11',
    name: 'Premium Leather Jacket',
    price: 249.99,
    oldPrice: 349.99,
    category: 'Fashion',
    rating: 4.5,
    reviewCount: 86,
    description: 'Luxurious leather jacket with quality stitching and comfortable fit.',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=500'
  },
  '14': {
    id: '14',
    name: 'Smart Coffee Maker',
    price: 149.99,
    oldPrice: 189.99,
    category: 'Home & Kitchen',
    rating: 4.5,
    reviewCount: 93,
    description: 'Smart coffee maker with programmable settings and mobile app control.',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=500'
  },
  '5': {
    id: '5',
    name: 'iPhone 16 Pre-Order',
    price: 999.99,
    oldPrice: 1199.99,
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 120,
    description: 'Pre-order the latest iPhone 16 with advanced features and a sleek design.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500'
  },
  '6': {
    id: '6',
    name: 'AirPods Pro',
    price: 249.99,
    oldPrice: 299.99,
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 150,
    description: 'Experience superior sound quality and noise cancellation with AirPods Pro.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500'
  },
  '7': {
    id: '7',
    name: 'Sony WH-1000XM4',
    price: 349.99,
    oldPrice: 399.99,
    category: 'Audio',
    rating: 4.9,
    reviewCount: 200,
    description: 'Industry-leading noise cancellation headphones with exceptional sound quality.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500'
  },
  '8': {
    id: '8',
    name: 'Canon EOS R5',
    price: 3999.99,
    oldPrice: 4499.99,
    category: 'Photography',
    rating: 4.6,
    reviewCount: 180,
    description: 'Capture stunning photos and 4K videos with the Canon EOS R5 camera.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500'
  },
  '9': {
    id: '9',
    name: 'Fitbit Versa 3',
    price: 199.99,
    oldPrice: 249.99,
    category: 'Wearables',
    rating: 4.3,
    reviewCount: 120,
    description: 'Track your health and fitness goals with the Fitbit Versa 3 smartwatch.',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=500'
  },
  '10': {
    id: '10',
    name: 'Xbox Series X',
    price: 499.99,
    oldPrice: 599.99,
    category: 'Gaming',
    rating: 4.9,
    reviewCount: 250,
    description: 'Experience next-gen gaming with the powerful Xbox Series X console.',
  }
};

// DOM elements
document.addEventListener('DOMContentLoaded', () => {
  // Cart functionality
  initCart();
  
  // Hero slider functionality
  initSlider();
  
  // Notification banner
  initNotificationBanner();
  
  // Special offer countdown
  initCountdown();
  
  // Testimonial slider
  initTestimonialSlider();
  
  // Product quick view
  initQuickView();
  
  // Newsletter form
  initNewsletterForm();
  
  // Mobile menu (for responsive design)
  initMobileMenu();
  
  // Product animations
  animateProductCards();
  
  // Initialize category filtering
  initCategoryFiltering();
  
  // Initialize enhanced product filtering
  initEnhancedProductFiltering();
  
  // Initialize product search
  initProductSearch();
  
  // Add premium products
  addPremiumProducts();
  
  // Add CSS styles for product cards
  addProductCardStyles();
});

// Initialize cart functionality
function initCart() {
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // DOM elements
  const cartCounter = document.getElementById('cart-counter');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  // Update cart UI
  function updateCartUI() {
    // Update cart counter
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    
    // Show/hide empty cart message
    if (totalItems === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
          <a href="#featured-products" class="btn primary-btn">Start Shopping</a>
        </div>
      `;
    } else {
      // Clear cart items container
      cartItemsContainer.innerHTML = '';
      
      // Calculate total
      let total = 0;
      
      // Add each item to cart
      Object.values(cart).forEach(item => {
        const product = products[item.id];
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        // Create cart item element
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${product.name}</h4>
            <div class="cart-item-price">$${product.price.toFixed(2)}</div>
            <div class="cart-item-controls">
              <button class="cart-quantity-btn decrease">-</button>
              <input type="text" class="cart-quantity" value="${item.quantity}" readonly>
              <button class="cart-quantity-btn increase">+</button>
            </div>
          </div>
          <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
        `;
        
        // Add event listeners to cart item controls
        cartItemElement.querySelector('.decrease').addEventListener('click', () => {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            delete cart[item.id];
          }
          saveCart();
          updateCartUI();
        });
        
        cartItemElement.querySelector('.increase').addEventListener('click', () => {
          item.quantity++;
          saveCart();
          updateCartUI();
        });
        
        cartItemElement.querySelector('.cart-item-remove').addEventListener('click', () => {
          delete cart[item.id];
          saveCart();
          updateCartUI();
          
          // Show removal animation
          cartItemElement.classList.add('removing');
          setTimeout(() => {
            cartItemElement.remove();
          }, 300);
        });
        
        // Add cart item to container
        cartItemsContainer.appendChild(cartItemElement);
      });
      
      // Update total
      cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productId = productCard.dataset.id;
      
      // Add animation effect
      const addedEffect = document.createElement('div');
      addedEffect.classList.add('added-to-cart-effect');
      productCard.appendChild(addedEffect);
      
      setTimeout(() => {
        addedEffect.remove();
      }, 1000);
      
      // Add to cart object
      if (cart[productId]) {
        cart[productId].quantity++;
      } else {
        cart[productId] = {
          id: productId,
          quantity: 1
        };
      }
      
      // Save cart and update UI
      saveCart();
      updateCartUI();
      
      // Show cart sidebar
      openCartSidebar();
    });
  });
  
  // Open cart sidebar
  function openCartSidebar() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  // Close cart sidebar
  function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  // Cart toggle event listeners
  openCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCartSidebar();
  });
  
  closeCartBtn.addEventListener('click', () => {
    closeCartSidebar();
  });
  
  cartOverlay.addEventListener('click', () => {
    closeCartSidebar();
  });
  
  // Checkout button
  checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }
    
    alert('Proceeding to checkout!');
    // Here you would typically redirect to a checkout page
  });
  
  // Initialize cart UI
  updateCartUI();
}

// Initialize hero slider
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Auto slide change interval (in milliseconds)
  const autoSlideInterval = 5000;
  let autoSlideTimer;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Hide all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Reset auto slide timer
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const sliderContainer = document.querySelector('.slider-container');
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  }
  
  // Start auto slide
  autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
}

// Initialize notification banner
function initNotificationBanner() {
  const banner = document.querySelector('.notification-banner');
  const closeBtn = document.querySelector('.close-notification');
  
  // Check if banner was previously closed
  const bannerClosed = localStorage.getItem('notification_banner_closed');
  
  if (bannerClosed) {
    banner.style.display = 'none';
  }
  
  closeBtn.addEventListener('click', () => {
    banner.style.height = banner.offsetHeight + 'px';
    
    // Trigger reflow
    banner.offsetHeight;
    
    banner.style.height = '0';
    banner.style.padding = '0';
    banner.style.opacity = '0';
    
    // Store that banner was closed
    localStorage.setItem('notification_banner_closed', 'true');
    
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  });
}

// Initialize countdown timer
function initCountdown() {
  // Set the countdown date (e.g., 7 days from now)
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);
  
  // Update countdown every second
  const countdownTimer = setInterval(updateCountdown, 1000);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If the countdown is finished
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }
  
  // Initialize countdown
  updateCountdown();
}

// Initialize testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  
  let currentTestimonial = 0;
  const testimonialCount = testimonials.length;
  
  // Auto testimonial change interval
  const autoChangeInterval = 5000;
  let autoChangeTimer;
  
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Show current testimonial
    testimonials[index].classList.add('active');
    
    // Reset auto change timer
    clearInterval(autoChangeTimer);
    autoChangeTimer = setInterval(nextTestimonial, autoChangeInterval);
  }
  
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    showTestimonial(currentTestimonial);
  }
  
  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
    showTestimonial(currentTestimonial);
  }
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Start auto change
    autoChangeTimer = setInterval(nextTestimonial, autoChangeInterval);
  }
}

// Initialize product quick view
function initQuickView() {
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  const modal = document.getElementById('quick-view-modal');
  const modalContent = document.getElementById('quick-view-content');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.getElementById('close-quick-view');
  
  // Open quick view modal
  quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = e.target.closest('.product-card');
      const productId = productCard.dataset.id;
      const product = products[productId];
      
      if (product && modal && modalContent && modalOverlay) {
        // Populate modal content
        modalContent.innerHTML = `
          <div class="quick-view-product">
            <div class="quick-view-image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
              <div class="product-category">${product.category}</div>
              <h2 class="product-name">${product.name}</h2>
              <div class="product-rating">
                ${getRatingStars(product.rating)}
                <span>(${product.reviewCount})</span>
              </div>
              <div class="product-price">
                ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                <span class="current-price">$${product.price.toFixed(2)}</span>
              </div>
              <div class="product-description">
                <p>${product.description}</p>
              </div>
              <div class="product-features">
                <h4>Key Features:</h4>
                <ul>
                  ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
              </div>
              <div class="product-availability">
                <p>Availability: <span class="${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                  ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span></p>
              </div>
              <div class="product-quantity">
                <label for="quantity">Quantity:</label>
                <div class="quantity-control">
                  <button class="quantity-btn decrease">-</button>
                  <input type="number" id="quantity" name="quantity" value="1" min="1" max="${product.stock}">
                  <button class="quantity-btn increase">+</button>
                </div>
              </div>
              <div class="product-actions">
                <button class="btn primary-btn add-to-cart-modal" data-id="${product.id}">
                  <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn outline-btn add-to-wishlist-modal">
                  <i class="far fa-heart"></i> Add to Wishlist
                </button>
                <button class="btn filled-btn add-to-compare-modal" data-id="${product.id}">
                  <i class="fas fa-exchange-alt"></i> Compare
                </button>
              </div>
              <a href="#product-${product.id}" class="view-full-details-btn">
                <i class="fas fa-external-link-alt"></i> View Full Product Details
              </a>
            </div>
          </div>
          <div class="related-products">
            <h3>You May Also Like</h3>
            <div class="related-products-container"></div>
          </div>
        `;
        
        // Add quantity control functionality
        const quantityInput = modalContent.querySelector('#quantity');
        const decreaseBtn = modalContent.querySelector('.decrease');
        const increaseBtn = modalContent.querySelector('.increase');
        
        decreaseBtn.addEventListener('click', () => {
          if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
          }
        });
        
        increaseBtn.addEventListener('click', () => {
          if (parseInt(quantityInput.value) < product.stock) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
          }
        });
        
        // Add to cart functionality
        const addToCartBtn = modalContent.querySelector('.add-to-cart-modal');
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            
            if (cart[productId]) {
              cart[productId].quantity += quantity;
            } else {
              cart[productId] = {
                id: productId,
                quantity: quantity
              };
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart UI
            initCart();
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.classList.add('add-success-message');
            successMessage.innerHTML = `
              <i class="fas fa-check-circle"></i>
              <p>${product.name} has been added to your cart!</p>
            `;
            
            modalContent.appendChild(successMessage);
            
            // Animate the cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
              cartIcon.classList.add('shake');
              setTimeout(() => {
                cartIcon.classList.remove('shake');
              }, 800);
            }
            
            setTimeout(() => {
              successMessage.classList.add('fade-out');
              setTimeout(() => {
                successMessage.remove();
              }, 300);
            }, 1700);
          });
        }
        
        // Add compare functionality
        const addToCompareBtn = modalContent.querySelector('.add-to-compare-modal');
        if (addToCompareBtn) {
          addToCompareBtn.addEventListener('click', () => {
            addToCompare(productId);
          });
        }
        
        // Add view full details functionality
        const viewDetailsBtn = modalContent.querySelector('.view-full-details-btn');
        if (viewDetailsBtn) {
          viewDetailsBtn.addEventListener('click', () => {
            closeModal();
            // This would typically navigate to a product detail page
            // For now, we'll just scroll to the product card
            setTimeout(() => {
              const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
              if (productCard) {
                productCard.scrollIntoView({ behavior: 'smooth' });
                productCard.classList.add('highlight');
                setTimeout(() => {
                  productCard.classList.remove('highlight');
                }, 2000);
              }
            }, 300);
          });
        }
        
        // Show related products with enhanced algorithm
        showEnhancedRelatedProducts(productId);
        
        // Show modal with animation
        modal.classList.add('open');
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
          modal.classList.add('loaded');
        }, 100);
      }
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Enhanced function to find and display related products
function showEnhancedRelatedProducts(productId) {
  // Implementation of showEnhancedRelatedProducts function
}

// Function to initialize product display with all the new products
function initProductDisplay() {
  console.log("initProductDisplay function called");
  const productContainer = document.querySelector('.products-grid') || document.querySelector('.products-container');
  if (!productContainer) {
    console.error("Product container not found");
    return;
  }
  
  console.log("Found product container:", productContainer);
  
  // Check if container already has static products (preserve them)
  const existingProducts = productContainer.innerHTML;
  
  let productHTML = '';
  
  // Generate HTML for all products
  Object.values(products).forEach(product => {
    // Skip products that already exist statically
    if (existingProducts.includes(`data-id="${product.id}"`)) {
      console.log(`Product ${product.id} already exists in DOM, skipping`);
      return;
    }
    
    // Skip premium products as they'll be shown in their own section
    if (product.premium) {
      return;
    }
    
    // Use the new createProductCardHTML function
    productHTML += createProductCardHTML(product);
  });
  
  // Append new products instead of replacing all content
  if (productHTML) {
    productContainer.innerHTML += productHTML;
    console.log("Product HTML appended:", productHTML.length > 100);
    
    // Add event listeners for the new product buttons
    addProductEventListeners(productContainer);
  } else {
    console.log("No new products to add");
  }
  
  // Trigger fade-in for initial load
  setTimeout(() => {
    productContainer.querySelectorAll('.product-card:not(.fade-in)').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * 50);
    });
  }, 100);
}

// Helper function to generate rating stars
function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded event fired");
  // Initialize existing functionality
  initProductDisplay();
  initProductFilters();
  initQuickView();
  initCart();
  
  // Add any new categories to filters
  updateFilterCategories();
  
  // Initialize navigation bar
  initNavBar();
  
  // Initialize product search
  initProductSearch();
  
  // Initialize cart functionality
  initCartFunctionality();
  
  // Initialize hero banner
  initHeroBanner();
  
  // Test cart functionality with sample product
  testCartFunctionality();
});

// Also call these functions immediately in case the DOM is already loaded
console.log("Executing script immediately");
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log("Document already loaded, initializing now");
  setTimeout(function() {
    initProductDisplay();
    initProductFilters();
    initQuickView();
    initCart();
    updateFilterCategories();
    initNavBar();
    initProductSearch();
    initCartFunctionality();
    
    // Initialize hero banner
    initHeroBanner();
    
    // Test cart functionality with sample product
    testCartFunctionality();
  }, 100); // Short delay to ensure DOM is ready
}

// Function to test cart functionality
function testCartFunctionality() {
  // Add a sample product to the cart
  const testProductId = '1'; // MacBook Pro
  if (products[testProductId]) {
    // Check if cart already has items
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // Only add test product if cart is empty
    if (Object.keys(cart).length === 0) {
      addToCart(testProductId, 1);
      console.log("Added test product to cart");
    }
  }
}

// Function to initialize cart functionality
function initCartFunctionality() {
  // Get elements
  const closeCartBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Add event listeners for close cart button
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      closeCartSidebar();
    });
  }
  
  // Add event listener for cart overlay (to close when clicked)
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCartSidebar();
      }
    });
  }
  
  // Add event listener for checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      
      if (Object.keys(cart).length === 0) {
        // Show empty cart message
        alert('Your cart is empty. Add items before checkout.');
        return;
      }
      
      // Add processing animation
      checkoutBtn.classList.add('processing');
      checkoutBtn.textContent = 'Processing...';
      
      // Simulate checkout process with a delay
      setTimeout(() => {
        // Here you would typically redirect to a checkout page
        checkoutBtn.classList.remove('processing');
        checkoutBtn.textContent = 'Checkout';
        
        // Show success confirmation
        const confirmCheckout = confirm('Proceed to payment page? (This is a simulation)');
        
        if (confirmCheckout) {
          // For demonstration, clear the cart after checkout
          localStorage.removeItem('cart');
          updateCartItems();
          updateBagCount();
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.classList.add('add-success-message');
          successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Order placed successfully! Redirecting to payment...</p>
          `;
          
          document.body.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.classList.add('show');
          }, 10);
          
          setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
              successMessage.remove();
            }, 300);
            
            // Close cart sidebar
            closeCartSidebar();
          }, 2000);
        }
      }, 1500);
    });
  }
  
  // Add keyboard support for closing cart (ESC key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const cartSidebar = document.getElementById('cart-sidebar');
      if (cartSidebar && cartSidebar.classList.contains('open')) {
        closeCartSidebar();
      }
    }
  });
  
  // Update bag count on initialization
  updateBagCount();
}

// Initialize navigation bar functionality
function initNavBar() {
  console.log("Initializing navigation bar");
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navBar = document.querySelector('.nav-bar');
  const overlay = document.querySelector('.overlay');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navBar.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Create overlay if it doesn't exist
      if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
        
        newOverlay.addEventListener('click', () => {
          navBar.classList.remove('active');
          document.body.classList.remove('no-scroll');
          newOverlay.classList.remove('active');
        });
        
        setTimeout(() => {
          newOverlay.classList.add('active');
        }, 10);
      } else {
        overlay.classList.toggle('active');
        
        if (!overlay.hasEventListener) {
          overlay.addEventListener('click', () => {
            navBar.classList.remove('active');
            document.body.classList.remove('no-scroll');
            overlay.classList.remove('active');
          });
          overlay.hasEventListener = true;
        }
      }
    });
  }
  
  // Categories dropdown
  const categoriesBtn = document.getElementById('categories-btn');
  const categoriesDropdown = document.querySelector('.categories-dropdown');
  const categoriesMenu = document.getElementById('categories-menu');
  const categoriesContent = document.querySelector('.categories-content');
  
  if (categoriesBtn && categoriesContent) {
    // Get unique categories
    const categories = [...new Set(Object.values(products).map(product => product.category))];
    
    // Sort categories alphabetically
    categories.sort();
    
    // Populate categories
    let categoriesHTML = '';
    categories.forEach(category => {
      categoriesHTML += `<div class="category-item" data-category="${category}">${category}</div>`;
    });
    
    categoriesContent.innerHTML = categoriesHTML;
    
    // Add event listeners for category items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        filterProducts(category);
        categoriesDropdown.classList.remove('active');
      });
    });
    
    // Toggle categories dropdown
    categoriesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      categoriesDropdown.classList.toggle('active');
      
      // Close other dropdowns
      document.querySelector('.user-account')?.classList.remove('active');
      document.getElementById('search-results')?.classList.remove('active');
    });
    
    // Close categories dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!categoriesDropdown.contains(e.target)) {
        categoriesDropdown.classList.remove('active');
      }
    });
  }
  
  // User account dropdown
  const accountBtn = document.getElementById('account-btn');
  const userAccount = document.querySelector('.user-account');
  const loginForm = document.querySelector('.login-form');
  const accountOverlay = document.getElementById('account-overlay');
  
  if (accountBtn && loginForm && accountOverlay) {
    // Toggle account dropdown
    accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Toggle dropdown and overlay
      userAccount.classList.toggle('active');
      accountOverlay.classList.toggle('active');
      
      // Close other dropdowns
      document.querySelector('.categories-dropdown')?.classList.remove('active');
      document.getElementById('search-results')?.classList.remove('active');
      
      // Animate form elements when opened
      if (userAccount.classList.contains('active')) {
        const formElements = loginForm.querySelectorAll('h3, .form-group, .login-btn, .form-footer');
        formElements.forEach((element, index) => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(10px)';
          setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, 100 + (index * 50));
        });
      }
    });
    
    // Close account dropdown when clicking overlay
    accountOverlay.addEventListener('click', () => {
      userAccount.classList.remove('active');
      accountOverlay.classList.remove('active');
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      
      // Simple validation
      if (email && password) {
        // Add animation to login button
        const loginBtn = loginForm.querySelector('.login-btn');
        loginBtn.textContent = 'Signing in...';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        
        // Simulate login process
        setTimeout(() => {
          // Display success message
          const successMessage = document.createElement('div');
          successMessage.className = 'login-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful!';
          
          loginForm.appendChild(successMessage);
          
          // Change account button to logged in state
          setTimeout(() => {
            accountBtn.innerHTML = '<i class="fas fa-user"></i><span>My Account</span>';
            userAccount.classList.remove('active');
            accountOverlay.classList.remove('active');
            
            // Reset form and button
            loginForm.reset();
            loginBtn.textContent = 'Sign In';
            loginBtn.disabled = false;
            loginBtn.style.opacity = '1';
            
            // Remove success message after dropdown is closed
            setTimeout(() => {
              successMessage.remove();
            }, 300);
          }, 1500);
        }, 800);
      }
    });
  }
  
  // Shopping bag
  const bagBtn = document.getElementById('bag-btn');
  
  if (bagBtn) {
    // Update bag count based on localStorage
    updateBagCount();
    
    // Open cart sidebar when clicking the bag button
    bagBtn.addEventListener('click', () => {
      openCartSidebar();
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput && searchBtn && searchResults) {
    // Create a debounced search function to avoid excessive searching while typing
    let searchTimeout;
    const debouncedSearch = (term) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (term.length >= 2) {
          // Filter products based on search term
          const filteredProducts = Object.values(products).filter(product => {
            const searchTerm = term.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchTerm) || 
              product.description.toLowerCase().includes(searchTerm) ||
              product.category.toLowerCase().includes(searchTerm)
            );
          }).slice(0, 5); // Limit to 5 results
          
          if (filteredProducts.length > 0) {
            let resultsHTML = '';
            filteredProducts.forEach(product => {
              resultsHTML += `
                <div class="search-result-item" data-id="${product.id}">
                  <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <div class="search-result-price">$${product.price.toFixed(2)}</div>
                  </div>
                </div>
              `;
            });
            
            // Add "View All Results" link
            resultsHTML += `
              <div class="view-all-results">
                <a href="#" data-search="${term}">View all results for "${term}"</a>
              </div>
            `;
            
            searchResults.innerHTML = resultsHTML;
            searchResults.classList.add('active');
            
            // Add event listeners for result items
            const resultItems = searchResults.querySelectorAll('.search-result-item');
            resultItems.forEach(item => {
              item.addEventListener('click', () => {
                const productId = item.getAttribute('data-id');
                showQuickView(productId);
                searchResults.classList.remove('active');
              });
            });
            
            // Add event listener for "View All Results" link
            const viewAllLink = searchResults.querySelector('.view-all-results a');
            if (viewAllLink) {
              viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                const searchTerm = e.target.getAttribute('data-search');
                searchProducts(searchTerm);
                searchResults.classList.remove('active');
                
                // Scroll to all products section
                document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });
              });
            }
          } else {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.classList.add('active');
          }
        }
      }, 300);
    };
    
    // Add input event listener
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim();
      debouncedSearch(term);
    });
    
    // Show popular product recommendations when search input is clicked
    searchInput.addEventListener('click', () => {
      const term = searchInput.value.trim();
      
      if (term.length < 2) {
        // Show recommended products instead of search results
        const recommendedProducts = getTopRatedProducts(5);
        
        if (recommendedProducts.length > 0) {
          let resultsHTML = '<div class="search-recommendations-header">Recommended Products</div>';
          
          recommendedProducts.forEach(product => {
            resultsHTML += `
              <div class="search-result-item" data-id="${product.id}">
                <div class="search-result-image">
                  <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                  <h4>${product.name}</h4>
                  <div class="search-result-price">$${product.price.toFixed(2)}</div>
                </div>
              </div>
            `;
          });
          
          searchResults.innerHTML = resultsHTML;
          searchResults.classList.add('active');
          
          // Add event listeners for result items
          const resultItems = searchResults.querySelectorAll('.search-result-item');
          resultItems.forEach(item => {
            item.addEventListener('click', () => {
              const productId = item.getAttribute('data-id');
              showQuickView(productId);
              searchResults.classList.remove('active');
            });
          });
        }
      }
    });
    
    // Add search button click event
    searchBtn.addEventListener('click', () => {
      const term = searchInput.value.trim();
      if (term.length >= 2) {
        searchProducts(term);
        searchResults.classList.remove('active');
      }
    });
    
    // Handle Enter key in search input
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const term = e.target.value.trim();
        if (term.length >= 2) {
          searchProducts(term);
          searchResults.classList.remove('active');
        }
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }
}

// Function to update bag count
function updateBagCount() {
  const bagCount = document.getElementById('bag-count');
  if (!bagCount) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let count = 0;
  
  // Count total items in cart
  Object.values(cart).forEach(item => {
    count += item.quantity;
  });
  
  bagCount.textContent = count;
  
  // Add animation if count changes
  bagCount.classList.add('pulse');
  setTimeout(() => {
    bagCount.classList.remove('pulse');
  }, 300);
}

// Function to search products
function searchProducts(term) {
  if (!term || term.length < 2) return;
  
  // Filter products based on search term
  const filteredProducts = Object.values(products).filter(product => {
    const searchTerm = term.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
  
  // Get products container
  const productsContainer = document.querySelector('.products-container');
  if (!productsContainer) return;
  
  if (filteredProducts.length > 0) {
    let productsHTML = '';
    
    filteredProducts.forEach(product => {
      productsHTML += `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
          <div class="product-badge ${product.oldPrice ? 'sale' : ''}">
            ${product.oldPrice ? 'SALE' : ''}
          </div>
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
              <button class="quick-view-btn" data-id="${product.id}">
                <i class="fas fa-eye"></i>
                <span>Quick View</span>
              </button>
              <button class="add-to-cart-btn" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
              ${getRatingStars(product.rating)}
              <span>(${product.reviewCount})</span>
            </div>
            <div class="product-price">
              ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
              <span class="current-price">$${product.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    });
    
    productsContainer.innerHTML = productsHTML;
    
    // Add event listeners for quick view and add to cart buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
      if (!button.hasAttribute('data-event-attached')) {
        button.setAttribute('data-event-attached', 'true');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = button.getAttribute('data-id');
          showQuickView(productId);
        });
      }
    });
    
    const addToCartButtons = document.querySelectorAll('.product-card .add-to-cart-btn');
    addToCartButtons.forEach(button => {
      if (!button.hasAttribute('data-event-attached')) {
        button.setAttribute('data-event-attached', 'true');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = button.getAttribute('data-id');
          addToCart(productId, 1);
        });
      }
    });
    
    // Add pulse animation to products
    setTimeout(() => {
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('fade-in');
        }, index * 50);
      });
    }, 100);
    
    // Update active filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-category="all"]')?.classList.add('active');
    
    // Show search results message
    const sectionHeader = document.querySelector('#all-products .section-header p');
    if (sectionHeader) {
      sectionHeader.textContent = `Search results for "${term}" (${filteredProducts.length} products found)`;
    }
  } else {
    productsContainer.innerHTML = `
      <div class="no-results-message">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>We couldn't find any products matching "${term}"</p>
        <button class="btn primary-btn reset-search-btn">View All Products</button>
      </div>
    `;
    
    // Add event listener for reset search button
    const resetBtn = document.querySelector('.reset-search-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        filterProducts('all');
        
        // Reset search input
        document.getElementById('search-input').value = '';
        
        // Update section header
        const sectionHeader = document.querySelector('#all-products .section-header p');
        if (sectionHeader) {
          sectionHeader.textContent = 'Browse our complete collection';
        }
      });
    }
  }
}

// Function to add item to cart
function addToCart(productId, quantity) {
  const product = products[productId];
  if (!product) return;
  
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // Add or update item in cart
  if (cart[productId]) {
    cart[productId].quantity += quantity;
  } else {
    cart[productId] = {
      id: productId,
      quantity: quantity
    };
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart UI
  updateCartItems();
  
  // Update bag count
  updateBagCount();
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.classList.add('add-success-message');
  successMessage.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <p>${product.name} has been added to your cart!</p>
  `;
  
  document.body.appendChild(successMessage);
  
  setTimeout(() => {
    successMessage.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    successMessage.classList.remove('show');
    setTimeout(() => {
      successMessage.remove();
    }, 300);
  }, 2000);
  
  // Open the cart sidebar if not already open (optional - uncomment to enable)
  // openCartSidebar();
}

// Function to open cart sidebar
function openCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (!cartSidebar || !cartOverlay) return;
  
  // Open cart sidebar
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.classList.add('no-scroll');
  
  // Populate cart items
  updateCartItems();
}

// Make openCartSidebar accessible globally
window.openCartSidebar = openCartSidebar;

// Function to close cart sidebar
function closeCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (!cartSidebar || !cartOverlay) return;
  
  // Close cart sidebar
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

// Make closeCartSidebar accessible globally
window.closeCartSidebar = closeCartSidebar;

// Function to update cart items
function updateCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (!cartItemsContainer || !cartTotalElement) return;
  
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // Check if cart is empty
  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <button class="btn primary-btn continue-shopping-btn">Continue Shopping</button>
      </div>
    `;
    
    // Add event listener to continue shopping button
    const continueShoppingBtn = cartItemsContainer.querySelector('.continue-shopping-btn');
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener('click', () => {
        closeCartSidebar();
      });
    }
    
    // Update total
    cartTotalElement.textContent = '$0.00';
    return;
  }
  
  // Clear cart items container
  cartItemsContainer.innerHTML = '';
  
  // Initialize totals
  let subtotal = 0;
  let itemCount = 0;
  let savedAmount = 0;
  
  // Add each item to cart
  Object.entries(cart).forEach(([productId, item]) => {
    const product = products[productId];
    if (!product) return;
    
    // Get price and calculate discounts
    const productPrice = product.price;
    const originalPrice = product.oldPrice || productPrice;
    
    // Calculate per item values
    const pricePerUnit = productPrice;
    const originalPricePerUnit = originalPrice;
    const savingsPerUnit = originalPricePerUnit > pricePerUnit ? originalPricePerUnit - pricePerUnit : 0;
    
    // Calculate total values for this item
    const itemOriginalTotal = originalPricePerUnit * item.quantity;
    const itemFinalTotal = pricePerUnit * item.quantity;
    const itemSavings = savingsPerUnit * item.quantity;
    
    // Add to running totals
    subtotal += itemFinalTotal;
    itemCount += item.quantity;
    savedAmount += itemSavings;
    
    // Format values for display
    const formattedPrice = pricePerUnit.toFixed(2);
    const formattedItemTotal = itemFinalTotal.toFixed(2);
    
    // Create savings text if applicable
    const savingsText = savingsPerUnit > 0 
      ? `<span class="item-savings">You save: $${savingsPerUnit.toFixed(2)} per item</span>` 
      : '';
      
    // Create cart item element
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.setAttribute('data-product-id', productId);
    cartItemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${product.name}</h4>
        <div class="cart-item-price">
          <span class="item-price">$${formattedPrice}</span>
          ${savingsText}
          <span class="item-total">Item subtotal: $${formattedItemTotal}</span>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn quantity-decrease" aria-label="Decrease quantity">-</button>
          <input type="text" class="quantity-input" value="${item.quantity}" 
                 data-price="${pricePerUnit}" 
                 data-product-id="${productId}"
                 min="1" max="99" pattern="[0-9]*" inputmode="numeric">
          <button class="quantity-btn quantity-increase" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item-remove" title="Remove item"><i class="fas fa-trash"></i></button>
    `;
    
    // Add event listeners to cart item controls
    const decreaseBtn = cartItemElement.querySelector('.quantity-decrease');
    const increaseBtn = cartItemElement.querySelector('.quantity-increase');
    const quantityInput = cartItemElement.querySelector('.quantity-input');
    const removeBtn = cartItemElement.querySelector('.cart-item-remove');
    
    // Handle quantity input changes
    quantityInput.addEventListener('input', (e) => {
      let value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 1;
      
      // Limit to reasonable values
      value = Math.max(1, Math.min(99, value));
      
      // Update input value
      e.target.value = value;
      
      // Update cart object
      item.quantity = value;
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update the item total
      const itemTotal = cartItemElement.querySelector('.item-total');
      const newTotal = (pricePerUnit * value).toFixed(2);
      itemTotal.textContent = `Item subtotal: $${newTotal}`;
      
      // Trigger recalculation of totals
      recalculateCartTotals();
      
      // Update bag count
      updateBagCount();
      
      // Apply animation
      applyUpdateAnimation(cartItemElement);
    });
    
    // Handle decreasing quantity
    decreaseBtn.addEventListener('click', () => {
      if (item.quantity > 1) {
        // Decrease quantity
        item.quantity--;
        
        // Update input value
        quantityInput.value = item.quantity;
        
        // Update item total display
        const itemTotal = cartItemElement.querySelector('.item-total');
        const newTotal = (pricePerUnit * item.quantity).toFixed(2);
        itemTotal.textContent = `Item subtotal: $${newTotal}`;
        
        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Recalculate totals
        recalculateCartTotals();
        
        // Update bag count
        updateBagCount();
        
        // Add animation to indicate update
        applyUpdateAnimation(cartItemElement);
      } else {
        // If quantity becomes 0, remove item
        removeCartItem(productId, cartItemElement);
      }
    });
    
    // Handle increasing quantity
    increaseBtn.addEventListener('click', () => {
      // Increase quantity (with maximum of 99)
      item.quantity = Math.min(99, item.quantity + 1);
      
      // Update input value
      quantityInput.value = item.quantity;
      
      // Update item total display
      const itemTotal = cartItemElement.querySelector('.item-total');
      const newTotal = (pricePerUnit * item.quantity).toFixed(2);
      itemTotal.textContent = `Item subtotal: $${newTotal}`;
      
      // Update cart in localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Recalculate totals
      recalculateCartTotals();
      
      // Update bag count
      updateBagCount();
      
      // Add animation to indicate update
      applyUpdateAnimation(cartItemElement);
    });
    
    // Handle removing item
    removeBtn.addEventListener('click', () => {
      removeCartItem(productId, cartItemElement);
    });
    
    // Add cart item to container
    cartItemsContainer.appendChild(cartItemElement);
  });
  
  // Calculate final values
  const tax = subtotal * 0.08; // 8% tax
  const shipping = calculateShipping(subtotal, itemCount);
  const total = subtotal + tax + shipping;
  
  // Add order summary to cart
  const orderSummary = document.createElement('div');
  orderSummary.classList.add('order-summary');
  orderSummary.id = 'order-summary';
  
  // Determine the shipping label based on cost
  let shippingLabel = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  
  // Show how much more to spend for free shipping if applicable
  let freeShippingMessage = '';
  if (shipping > 0) {
    const amountForFreeShipping = 100 - subtotal;
    if (amountForFreeShipping > 0) {
      freeShippingMessage = `
        <div class="free-shipping-message">
          Spend $${amountForFreeShipping.toFixed(2)} more for FREE shipping!
        </div>
      `;
    }
  }
  
  // Show savings if any
  let savingsRow = '';
  if (savedAmount > 0) {
    savingsRow = `
      <div class="summary-row savings">
        <span>Savings</span>
        <span>-$${savedAmount.toFixed(2)}</span>
      </div>
    `;
  }
  
  orderSummary.innerHTML = `
    <h4>Order Summary</h4>
    <div class="summary-row">
      <span>Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    ${savingsRow}
    <div class="summary-row">
      <span>Tax (8%)</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shippingLabel}</span>
    </div>
    ${freeShippingMessage}
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
  
  cartItemsContainer.appendChild(orderSummary);
  
  // Update total in cart footer
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  
  // Store cart totals in localStorage for easy access
  localStorage.setItem('cartTotals', JSON.stringify({
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
    savedAmount
  }));
}

// Calculate shipping cost based on subtotal and item count
function calculateShipping(subtotal, itemCount) {
  // Free shipping for orders over $100
  if (subtotal >= 100) return 0;
  
  // Base shipping cost is $10
  let shipping = 10;
  
  // Add $2 for each additional 5 items over 5 items
  if (itemCount > 5) {
    const additionalGroups = Math.floor((itemCount - 5) / 5);
    shipping += additionalGroups * 2;
  }
  
  return shipping;
}

// Remove item from cart with animation
function removeCartItem(productId, cartItemElement) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // Remove item from cart object
  delete cart[productId];
  
  // Update cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Add removing animation
  cartItemElement.classList.add('removing');
  
  // After animation completes, update the cart UI
  setTimeout(() => {
    updateCartItems();
    updateBagCount();
  }, 300);
}

// Recalculate cart totals without full refresh
function recalculateCartTotals() {
  // Get all cart items
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // Initialize totals
  let subtotal = 0;
  let itemCount = 0;
  let savedAmount = 0;
  
  // Calculate totals from cart items
  Object.entries(cart).forEach(([productId, item]) => {
    const product = products[productId];
    if (!product) return;
    
    // Get prices
    const productPrice = product.price;
    const originalPrice = product.oldPrice || productPrice;
    
    // Calculate savings
    const savingsPerUnit = originalPrice > productPrice ? originalPrice - productPrice : 0;
    
    // Add to totals
    subtotal += productPrice * item.quantity;
    itemCount += item.quantity;
    savedAmount += savingsPerUnit * item.quantity;
  });
  
  // Calculate final values
  const tax = subtotal * 0.08;
  const shipping = calculateShipping(subtotal, itemCount);
  const total = subtotal + tax + shipping;
  
  // Update order summary
  const orderSummary = document.getElementById('order-summary');
  if (orderSummary) {
    // Determine the shipping label
    let shippingLabel = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    
    // Calculate potential free shipping message
    let freeShippingMessage = '';
    if (shipping > 0) {
      const amountForFreeShipping = 100 - subtotal;
      if (amountForFreeShipping > 0) {
        freeShippingMessage = `
          <div class="free-shipping-message">
            Spend $${amountForFreeShipping.toFixed(2)} more for FREE shipping!
          </div>
        `;
      }
    }
    
    // Show savings if any
    let savingsRow = '';
    if (savedAmount > 0) {
      savingsRow = `
        <div class="summary-row savings">
          <span>Savings</span>
          <span>-$${savedAmount.toFixed(2)}</span>
        </div>
      `;
    }
    
    orderSummary.innerHTML = `
      ${freeShippingMessage}
      <div class="summary-rows">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        ${savingsRow}
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shippingLabel}</span>
        </div>
        <div class="summary-row">
          <span>Estimated Tax</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      </div>
      <button class="checkout-btn">Checkout</button>
    `;
  }
  
  // Update total in cart footer
  const cartTotalElement = document.getElementById('cart-total');
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Store cart totals in localStorage for easy access
  localStorage.setItem('cartTotals', JSON.stringify({
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
    savedAmount
  }));
}

// Function to apply update animation to cart item
function applyUpdateAnimation(element) {
  element.classList.add('updating');
  setTimeout(() => {
    element.classList.remove('updating');
  }, 500);
}

// Enhanced cart functionality
function initEnhancedCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  // Cart elements
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const cartCount = document.querySelector('.cart-count');
  
  // Initialize cart on load
  renderCart();
  updateCartCount();
  
  // Event listener for checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', processCheckout);
  }
  
  // Add event delegation for cart items
  document.addEventListener('click', function(e) {
    // Remove item from cart
    if (e.target.classList.contains('cart-item-remove')) {
      const cartItem = e.target.closest('.cart-item');
      const productId = cartItem.dataset.id;
      removeFromCart(productId);
      cartItem.classList.add('removing');
      setTimeout(() => {
        renderCart();
      }, 300);
    }
    
    // Quantity buttons
    if (e.target.classList.contains('quantity-btn')) {
      const cartItem = e.target.closest('.cart-item');
      const productId = cartItem.dataset.id;
      const isIncrease = e.target.classList.contains('increase');
      
      updateCartItemQuantity(productId, isIncrease);
      
      // Add animation to price
      const priceElement = cartItem.querySelector('.cart-item-price');
      if (priceElement) {
        priceElement.classList.add('updating');
        setTimeout(() => {
          priceElement.classList.remove('updating');
        }, 500);
      }
    }
    
    // Checkout button
    if (e.target.classList.contains('checkout-btn')) {
      e.preventDefault();
      processCheckout(e.target);
    }
  });
}

function processCheckout(button) {
  // Add processing animation
  button.classList.add('processing');
  button.textContent = 'Processing...';
  
  // Simulate API call
  setTimeout(() => {
    // Redirect to checkout page or show success message
    button.textContent = 'Success!';
    
    setTimeout(() => {
      // Clear cart and show empty state
      localStorage.removeItem('cart');
      renderCart();
      updateCartCount();
      
      // Reset button
      setTimeout(() => {
        button.classList.remove('processing');
        button.textContent = 'Checkout';
      }, 500);
    }, 1000);
  }, 2000);
}

function renderCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const orderSummary = document.querySelector('.order-summary');
  if (!cartItemsContainer) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    // Show empty cart message
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <button class="btn continue-shopping-btn">Continue Shopping</button>
      </div>
    `;
    
    // Hide order summary if it exists
    if (orderSummary) {
      orderSummary.style.display = 'none';
    }
    return;
  }
  
  // Show order summary
  if (orderSummary) {
    orderSummary.style.display = 'block';
  }
  
  // Calculate total and render items
  let cartHTML = '';
  let subtotal = 0;
  let savings = 0;
  
  cart.forEach(item => {
    const product = products.find(p => p.id === parseInt(item.id));
    if (!product) return;
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    // Calculate savings if there's a discount
    if (product.oldPrice) {
      const itemSavings = (product.oldPrice - product.price) * item.quantity;
      savings += itemSavings;
    }
    
    cartHTML += `
      <div class="cart-item" data-id="${product.id}">
        <button class="cart-item-remove" aria-label="Remove item">×</button>
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-name">${product.name}</h3>
          <div class="cart-item-meta">
            ${product.color ? `<span class="cart-item-color">Color: ${product.color}</span>` : ''}
            ${product.size ? `<span class="cart-item-size">Size: ${product.size}</span>` : ''}
          </div>
          <div class="cart-item-price ${product.oldPrice ? 'discounted' : ''}">
            $${product.price.toFixed(2)}
            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="quantity-control">
            <button class="quantity-btn decrease" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" readonly>
            <button class="quantity-btn increase">+</button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  
  // Update order summary
  updateOrderSummary(subtotal, savings);
}

function updateOrderSummary(subtotal, savings) {
  const orderSummary = document.querySelector('.order-summary');
  if (!orderSummary) return;
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Determine if eligible for free shipping
  const freeShippingMessage = subtotal > 50 
    ? '<div class="free-shipping-message success"><i class="fas fa-truck"></i> Your order qualifies for FREE shipping!</div>'
    : `<div class="free-shipping-message"><i class="fas fa-truck"></i> Add $${(50 - subtotal).toFixed(2)} more for FREE shipping</div>`;
  
  orderSummary.innerHTML = `
    ${freeShippingMessage}
    <div class="summary-rows">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      ${savings > 0 ? `
        <div class="summary-row savings">
          <span>Savings</span>
          <span>-$${savings.toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Estimated Tax</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    </div>
    <button class="checkout-btn">Checkout</button>
  `;
}

function updateCartItemQuantity(productId, isIncrease) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex === -1) return;
  
  if (isIncrease) {
    cart[itemIndex].quantity += 1;
  } else if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity -= 1;
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count indicator
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = cartCount;
    element.style.display = cartCount > 0 ? 'flex' : 'none';
    
    // Add pulse animation if count changed
    if (cartCount > 0) {
      element.classList.add('pulse');
      setTimeout(() => {
        element.classList.remove('pulse');
      }, 300);
    }
  });
}

// Add function to the initialization list
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initEnhancedCart();
  // ... existing code ...
});

// Document ready function to ensure all elements are loaded before JS runs
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document loaded, initializing account dropdown');
  
  // Initialize the enhanced account functionality
  initEnhancedAccount();
  
  // Add a subtle pulse animation to the account button to draw attention
  const accountBtn = document.getElementById('account-btn');
  if (accountBtn) {
    setTimeout(() => {
      accountBtn.classList.add('pulse-attention');
      
      // Remove the pulse after 2 pulses
      setTimeout(() => {
        accountBtn.classList.remove('pulse-attention');
      }, 2000);
    }, 1000);
  }
});

// Login popup functionality
function initLoginPopup() {
  const accountBtn = document.getElementById('account-btn');
  const userAccount = document.querySelector('.user-account');
  const accountOverlay = document.getElementById('account-overlay');
  const loginForm = document.querySelector('.login-form');
  
  // Make sure all elements exist
  if (!accountBtn || !userAccount || !accountOverlay || !loginForm) {
    console.error('Login popup elements not found!', { 
      accountBtn, userAccount, accountOverlay, loginForm 
    });
    return;
  }
  
  console.log('Initializing login popup');
  
  // Clean up any existing click events using cloneNode
  const newAccountBtn = accountBtn.cloneNode(true);
  accountBtn.parentNode.replaceChild(newAccountBtn, accountBtn);
  
  // Add fresh click event
  newAccountBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Sign in button clicked');
    
    // Toggle account dropdown
    userAccount.classList.toggle('active');
    accountOverlay.classList.toggle('active');
    
    // Animate form elements when opened
    if (userAccount.classList.contains('active')) {
      console.log('Opening sign-in form');
      const formElements = loginForm.querySelectorAll('h3, .form-group, .login-btn, .form-footer');
      formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        setTimeout(() => {
          element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
      });
    }
  });
  
  // Close when clicking overlay
  accountOverlay.addEventListener('click', function() {
    userAccount.classList.remove('active');
    accountOverlay.classList.remove('active');
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!userAccount.contains(e.target) && e.target !== newAccountBtn && userAccount.classList.contains('active')) {
      userAccount.classList.remove('active');
      accountOverlay.classList.remove('active');
    }
  });
  
  // Handle login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Simple validation
    if (email && password) {
      const loginBtn = loginForm.querySelector('.login-btn');
      loginBtn.textContent = 'Signing in...';
      loginBtn.disabled = true;
      
      // Simulate login process
      setTimeout(function() {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'login-success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful!';
        loginForm.appendChild(successMessage);
        
        // Change account button to logged in state
        setTimeout(function() {
          newAccountBtn.innerHTML = '<i class="fas fa-user"></i><span>My Account</span>';
          userAccount.classList.remove('active');
          accountOverlay.classList.remove('active');
          
          // Reset form and button
          loginForm.reset();
          loginBtn.textContent = 'Sign In';
          loginBtn.disabled = false;
          
          // Remove success message
          setTimeout(function() {
            successMessage.remove();
          }, 300);
        }, 1500);
      }, 800);
    }
  });
}

// Call the function when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the login popup
  initLoginPopup();
});

// Enhanced Account Functionality
function initEnhancedAccount() {
  const accountBtn = document.getElementById('account-btn');
  const userAccount = document.querySelector('.user-account');
  const accountOverlay = document.getElementById('account-overlay');
  
  // Get tabs and forms
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  // Initialize - make sure any stuck/lingering active states are cleared
  userAccount.classList.remove('active');
  if (accountOverlay) accountOverlay.classList.remove('active');
  
  // Initialize password toggle buttons
  initPasswordToggle();
  
  // Toggle account dropdown
  if (accountBtn) {
    // Remove any existing event listeners (important for preventing multiple handlers)
    const newBtn = accountBtn.cloneNode(true);
    accountBtn.parentNode.replaceChild(newBtn, accountBtn);
    
    // Add fresh event listener
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle dropdown and overlay
      userAccount.classList.toggle('active');
      if (accountOverlay) {
        accountOverlay.classList.toggle('active');
      }
      
      // If opening the dropdown, reset and animate forms
      if (userAccount.classList.contains('active')) {
        // Reset forms
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
        
        // Make sure the right form is showing (login by default)
        authTabs.forEach(tab => {
          if (tab.getAttribute('data-tab') === 'login') {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
        
        authForms.forEach(form => {
          if (form.id === 'login-form') {
            form.classList.add('active');
          } else {
            form.classList.remove('active');
          }
        });
        
        // Animate form elements with delay to match popup animation
        setTimeout(() => {
          if (typeof animateFormElements === 'function') {
            animateFormElements(document.querySelector('.auth-form.active'));
          }
        }, 100);
      }
    });
  }
  
  // Handle tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Skip if already active
      if (this.classList.contains('active')) return;
      
      // Get the form to show based on tab data
      const formToShow = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and forms
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      // Add active class to current tab and corresponding form
      this.classList.add('active');
      const targetForm = document.getElementById(`${formToShow}-form`);
      if (targetForm) {
        targetForm.classList.add('active');
        // Animate the form elements if the function exists
        if (typeof animateFormElements === 'function') {
          animateFormElements(targetForm);
        }
      }
    });
  });
  
  // Close overlay when clicking it
  if (accountOverlay) {
    // Remove existing event listeners to prevent duplicates
    const newOverlay = accountOverlay.cloneNode(true);
    accountOverlay.parentNode.replaceChild(newOverlay, accountOverlay);
    
    // Add fresh event listener
    newOverlay.addEventListener('click', function(e) {
      // Only close if the actual overlay is clicked, not its children
      if (e.target === this) {
        userAccount.classList.remove('active');
        this.classList.remove('active');
      }
    });
  }
  
  // Prevent clicks inside the dropdown from closing it
  if (userAccount) {
    const dropdown = userAccount.querySelector('.account-dropdown');
    if (dropdown) {
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }
  
  // Initialize form input fields to ensure they're interactive
  const formInputs = document.querySelectorAll('.auth-form input, .auth-form select, .auth-form button');
  formInputs.forEach(input => {
    input.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  
  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (email && password) {
        // Add loading state to button
        const submitBtn = this.querySelector('.login-btn');
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(function() {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'login-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful!';
          
          // Remove any existing success message
          const existingMessage = loginForm.querySelector('.login-success');
          if (existingMessage) existingMessage.remove();
          
          loginForm.appendChild(successMessage);
          
          // Update account button
          setTimeout(function() {
            // Update button text
            newBtn.innerHTML = '<i class="fas fa-user-check"></i><span>My Account</span>';
            
            // Close dropdown
            userAccount.classList.remove('active');
            if (accountOverlay) accountOverlay.classList.remove('active');
            
            // Reset form and button
            loginForm.reset();
            submitBtn.textContent = 'Sign In';
            submitBtn.disabled = false;
          }, 1500);
        }, 800);
      }
    });
  }
  
  // Handle registration form submission
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm').value;
      
      // Basic validation
      if (password !== confirmPassword) {
        showFormError(registerForm, 'Passwords do not match');
        return;
      }
      
      if (name && email && password && confirmPassword) {
        // Add loading state to button
        const submitBtn = this.querySelector('.register-btn');
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(function() {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'login-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Registration successful!';
          
          // Remove any existing success message
          const existingMessage = registerForm.querySelector('.login-success');
          if (existingMessage) existingMessage.remove();
          
          registerForm.appendChild(successMessage);
          
          // Update account button
          setTimeout(function() {
            // Switch to login tab after successful registration
            authTabs.forEach(tab => {
              if (tab.getAttribute('data-tab') === 'login') {
                tab.click();
              }
            });
            
            // Reset button
            submitBtn.textContent = 'Create Account';
            submitBtn.disabled = false;
            
            // Remove success message
            successMessage.remove();
          }, 1500);
        }, 800);
      }
    });
  }
}

// Function to animate form elements sequentially
function animateFormElements(form) {
  if (!form) return;
  
  const elements = form.querySelectorAll('h3, .form-subtitle, .form-group, .form-options, button, .social-login');
  elements.forEach((element, index) => {
    // Reset initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(15px)';
    
    // Animate in sequence
    setTimeout(() => {
      element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50 + (index * 60));
  });
}

// Function to show form error
function showFormError(form, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  
  // Remove any existing error
  const existingError = form.querySelector('.form-error');
  if (existingError) existingError.remove();
  
  // Add new error after the first form group
  const firstFormGroup = form.querySelector('.form-group');
  if (firstFormGroup) {
    firstFormGroup.parentNode.insertBefore(errorDiv, firstFormGroup.nextSibling);
  } else {
    form.prepend(errorDiv);
  }
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    errorDiv.classList.add('fade-out');
    setTimeout(() => {
      errorDiv.remove();
    }, 300);
  }, 3000);
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the enhanced account functionality
  initEnhancedAccount();
});

// Initialize password toggle functionality
function initPasswordToggle() {
  // Password visibility toggle for all password fields
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  
  togglePasswordBtns.forEach(btn => {
    // Remove existing listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Add fresh event listener
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const passwordInput = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle password visibility
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        this.setAttribute('aria-label', 'Hide password');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        this.setAttribute('aria-label', 'Show password');
      }
      
      // Focus back on the input
      passwordInput.focus();
    });
  });
  
  // Add password toggles to register form fields if not already present
  const registerPasswordInputs = document.querySelectorAll('#register-password, #register-confirm');
  registerPasswordInputs.forEach(input => {
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('toggle-password')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'toggle-password';
      toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
      toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
      
      input.parentNode.insertBefore(toggleBtn, input.nextSibling);
      
      // Add event listener to the new button
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const passwordInput = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        // Toggle password visibility
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
          this.setAttribute('aria-label', 'Hide password');
        } else {
          passwordInput.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
          this.setAttribute('aria-label', 'Show password');
        }
        
        // Focus back on the input
        passwordInput.focus();
      });
    }
  });
  
  // Initialize password reset functionality
  initPasswordReset();
}

// Initialize password reset functionality
function initPasswordReset() {
  const forgotLink = document.getElementById('forgot-link');
  const loginForm = document.getElementById('login-form');
  const resetForm = document.getElementById('password-reset-form');
  const backBtn = resetForm ? resetForm.querySelector('.back-btn') : null;
  const resetBtn = resetForm ? resetForm.querySelector('.reset-btn') : null;
  
  if (forgotLink && loginForm && resetForm) {
    // Show password reset form
    forgotLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Hide login form elements except the reset form
      const loginElements = loginForm.querySelectorAll('h3, .form-subtitle, .form-group, .form-options, .login-btn, .social-login');
      loginElements.forEach(el => {
        el.style.display = 'none';
      });
      
      // Show reset form
      resetForm.style.display = 'block';
      
      // Focus on email input
      const resetEmail = document.getElementById('reset-email');
      if (resetEmail) {
        resetEmail.focus();
        
        // Pre-fill with login email if available
        const loginEmail = document.getElementById('login-email');
        if (loginEmail && loginEmail.value) {
          resetEmail.value = loginEmail.value;
        }
      }
    });
    
    // Back to login form
    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Hide reset form
        resetForm.style.display = 'none';
        
        // Show login form elements
        const loginElements = loginForm.querySelectorAll('h3, .form-subtitle, .form-group, .form-options, .login-btn, .social-login');
        loginElements.forEach(el => {
          el.style.display = '';
        });
      });
    }
    
    // Handle reset password request
    if (resetBtn) {
      resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const email = document.getElementById('reset-email').value;
        
        if (email) {
          // Show loading state
          this.textContent = 'Sending...';
          this.disabled = true;
          
          // Simulate API call
          setTimeout(() => {
            // Show success message
            resetForm.innerHTML = `
              <div class="reset-success">
                <i class="fas fa-check-circle"></i>
                <h4>Reset Link Sent!</h4>
                <p>We've sent password reset instructions to ${email}</p>
                <p class="small">Please check your email inbox and spam folder</p>
                <button type="button" class="btn primary-btn back-to-login-btn">Back to Login</button>
              </div>
            `;
            
            // Add event listener to the new back button
            const backToLoginBtn = resetForm.querySelector('.back-to-login-btn');
            if (backToLoginBtn) {
              backToLoginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Hide reset form
                resetForm.style.display = 'none';
                
                // Show login form elements
                const loginElements = loginForm.querySelectorAll('h3, .form-subtitle, .form-group, .form-options, .login-btn, .social-login');
                loginElements.forEach(el => {
                  el.style.display = '';
                });
              });
            }
          }, 1500);
        }
      });
    }
  }
}

// Call our enhanced login form initialization when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initEnhancedLoginForm();
});

// Function to get top rated products
function getTopRatedProducts(count = 5) {
  return Object.values(products)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

/**
 * Initialize Hero Banner
 * Creates and manages a dynamic hero banner with slides and CTA buttons
 */
function initHeroBanner() {
    const heroContainer = document.querySelector('.hero-container');
    if (!heroContainer) return;
    
    // Hero banner data - can be replaced with API call
    const heroSlides = [
        {
            title: "Summer Collection 2023",
            subtitle: "Discover the latest trends in summer fashion",
            description: "Refresh your wardrobe with our new arrivals. Up to 30% off on selected items.",
            ctaText: "Shop Now",
            ctaLink: "#products",
            imageSrc: "img/hero/summer-collection.jpg",
            backgroundColor: "#f5f8ff"
        },
        {
            title: "Premium Accessories",
            subtitle: "Elevate your style with our premium collection",
            description: "Luxury watches, bags, and jewelry that complement your unique style.",
            ctaText: "Explore Collection",
            ctaLink: "#accessories",
            imageSrc: "img/hero/accessories.jpg",
            backgroundColor: "#fff5f5"
        },
        {
            title: "Home Decor Essentials",
            subtitle: "Transform your living space",
            description: "Discover unique home decor pieces that add character to your home.",
            ctaText: "View Collection",
            ctaLink: "#home-decor",
            imageSrc: "img/hero/home-decor.jpg",
            backgroundColor: "#f5fff7"
        }
    ];
    
    let currentSlide = 0;
    
    // Create hero banner structure
    function createHeroBanner() {
        const heroHTML = `
            <div class="hero-banner" style="background-color: ${heroSlides[0].backgroundColor}">
                <div class="hero-content">
                    <h1 class="hero-title">${heroSlides[0].title}</h1>
                    <h2 class="hero-subtitle">${heroSlides[0].subtitle}</h2>
                    <p class="hero-description">${heroSlides[0].description}</p>
                    <a href="${heroSlides[0].ctaLink}" class="hero-cta-btn">${heroSlides[0].ctaText}</a>
                </div>
                <div class="hero-image">
                    <img src="${heroSlides[0].imageSrc}" alt="${heroSlides[0].title}">
                </div>
                <div class="hero-controls">
                    <button class="hero-prev"><i class="fas fa-chevron-left"></i></button>
                    <div class="hero-dots"></div>
                    <button class="hero-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        
        heroContainer.innerHTML = heroHTML;
        
        // Create dots
        const dotsContainer = document.querySelector('.hero-dots');
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('hero-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
        
        // Add event listeners
        document.querySelector('.hero-prev').addEventListener('click', prevSlide);
        document.querySelector('.hero-next').addEventListener('click', nextSlide);
        
        document.querySelectorAll('.hero-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
            });
        });
        
        // Start auto rotation
        startAutoRotation();
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        if (index < 0) index = heroSlides.length - 1;
        if (index >= heroSlides.length) index = 0;
        
        currentSlide = index;
        updateSlide();
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Update slide content
    function updateSlide() {
        const slide = heroSlides[currentSlide];
        const heroElement = document.querySelector('.hero-banner');
        
        // Update content with smooth fade
        heroElement.style.backgroundColor = slide.backgroundColor;
        
        const title = document.querySelector('.hero-title');
        const subtitle = document.querySelector('.hero-subtitle');
        const description = document.querySelector('.hero-description');
        const ctaBtn = document.querySelector('.hero-cta-btn');
        const image = document.querySelector('.hero-image img');
        
        // Fade out
        [title, subtitle, description, ctaBtn, image].forEach(el => {
            el.classList.add('fade-out');
        });
        
        // Update content after fade out
        setTimeout(() => {
            title.textContent = slide.title;
            subtitle.textContent = slide.subtitle;
            description.textContent = slide.description;
            ctaBtn.textContent = slide.ctaText;
            ctaBtn.href = slide.ctaLink;
            image.src = slide.imageSrc;
            image.alt = slide.title;
            
            // Fade in
            [title, subtitle, description, ctaBtn, image].forEach(el => {
                el.classList.remove('fade-out');
                el.classList.add('fade-in');
            });
            
            // Reset fade classes
            setTimeout(() => {
                [title, subtitle, description, ctaBtn, image].forEach(el => {
                    el.classList.remove('fade-in');
                });
            }, 500);
        }, 300);
        
        // Update active dot
        document.querySelectorAll('.hero-dot').forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto rotate slides
    let autoRotationTimer;
    function startAutoRotation() {
        autoRotationTimer = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoRotation() {
        clearInterval(autoRotationTimer);
    }
    
    // Pause auto rotation on hover
    heroContainer.addEventListener('mouseenter', stopAutoRotation);
    heroContainer.addEventListener('mouseleave', startAutoRotation);
    
    // Initialize banner
    createHeroBanner();
}

// Function to initialize product search
function initProductSearch() {
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput && searchBtn && searchResults) {
    // Create a debounced search function to avoid excessive searching while typing
    let searchTimeout;
    const debouncedSearch = (term) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (term.length >= 2) {
          // Filter products based on search term
          const filteredProducts = Object.values(products).filter(product => {
            const searchTerm = term.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchTerm) || 
              product.description.toLowerCase().includes(searchTerm) ||
              product.category.toLowerCase().includes(searchTerm)
            );
          }).slice(0, 5); // Limit to 5 results
          
          if (filteredProducts.length > 0) {
            let resultsHTML = '';
            filteredProducts.forEach(product => {
              resultsHTML += `
                <div class="search-result-item" data-id="${product.id}">
                  <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <div class="search-result-price">$${product.price.toFixed(2)}</div>
                  </div>
                </div>
              `;
            });
            
            // Add "View All Results" link
            resultsHTML += `
              <div class="view-all-results">
                <a href="#" data-search="${term}">View all results for "${term}"</a>
              </div>
            `;
            
            searchResults.innerHTML = resultsHTML;
            searchResults.classList.add('active');
            
            // Add event listeners for result items
            const resultItems = searchResults.querySelectorAll('.search-result-item');
            resultItems.forEach(item => {
              item.addEventListener('click', () => {
                const productId = item.getAttribute('data-id');
                showQuickView(productId);
                searchResults.classList.remove('active');
              });
            });
            
            // Add event listener for "View All Results" link
            const viewAllLink = searchResults.querySelector('.view-all-results a');
            if (viewAllLink) {
              viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                const searchTerm = e.target.getAttribute('data-search');
                searchProducts(searchTerm);
                searchResults.classList.remove('active');
                
                // Scroll to all products section
                document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });
              });
            }
          } else {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.classList.add('active');
          }
        }
      }, 300);
    };
    
    // Add input event listener
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim();
      debouncedSearch(term);
    });
    
    // Show popular product recommendations when search input is clicked
    searchInput.addEventListener('click', () => {
      const term = searchInput.value.trim();
      
      if (term.length < 2) {
        // Show recommended products instead of search results
        const recommendedProducts = getTopRatedProducts(5);
        
        if (recommendedProducts.length > 0) {
          let resultsHTML = '<div class="search-recommendations-header">Recommended Products</div>';
          
          recommendedProducts.forEach(product => {
            resultsHTML += `
              <div class="search-result-item" data-id="${product.id}">
                <div class="search-result-image">
                  <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                  <h4>${product.name}</h4>
                  <div class="search-result-price">$${product.price.toFixed(2)}</div>
                </div>
              </div>
            `;
          });
          
          searchResults.innerHTML = resultsHTML;
          searchResults.classList.add('active');
          
          // Add event listeners for result items
          const resultItems = searchResults.querySelectorAll('.search-result-item');
          resultItems.forEach(item => {
            item.addEventListener('click', () => {
              const productId = item.getAttribute('data-id');
              showQuickView(productId);
              searchResults.classList.remove('active');
            });
          });
        }
      }
    });
    
    // Add search button click event
    searchBtn.addEventListener('click', () => {
      const term = searchInput.value.trim();
      if (term.length >= 2) {
        searchProducts(term);
        searchResults.classList.remove('active');
      }
    });
    
    // Handle Enter key in search input
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const term = e.target.value.trim();
        if (term.length >= 2) {
          searchProducts(term);
          searchResults.classList.remove('active');
        }
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }
}

// Premium products data
function addPremiumProducts() {
  // Add premium products to the existing products object
  products['101'] = {
    id: '101',
    name: 'Luxury Swiss Watch',
    price: 2999.99,
    premium: true,
    category: 'Premium',
    rating: 4.9,
    reviewCount: 42,
    description: 'Handcrafted luxury Swiss watch with genuine leather strap and sapphire crystal.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500'
  };
  
  products['102'] = {
    id: '102',
    name: 'Italian Leather Briefcase',
    price: 899.99,
    premium: true,
    category: 'Premium',
    rating: 4.8,
    reviewCount: 36,
    description: 'Handmade Italian leather briefcase with solid brass hardware and premium stitching.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500'
  };
  
  products['103'] = {
    id: '103',
    name: 'Premium Smart Home System',
    price: 1299.99,
    premium: true,
    category: 'Premium',
    rating: 4.9,
    reviewCount: 58,
    description: 'Complete smart home system with voice control, premium speakers, and intelligent automation.',
    image: 'https://images.unsplash.com/photo-1587037542794-5d7913d3c2cd?q=80&w=500'
  };
  
  products['104'] = {
    id: '104',
    name: 'Limited Edition Headphones',
    price: 799.99,
    oldPrice: 999.99,
    premium: true,
    category: 'Premium',
    rating: 4.9,
    reviewCount: 76,
    description: 'Limited edition premium headphones with custom sound profile and handcrafted materials.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500'
  };
  
  products['105'] = {
    id: '105',
    name: 'Designer Sunglasses',
    price: 349.99,
    premium: true,
    category: 'Premium',
    rating: 4.7,
    reviewCount: 95,
    description: 'Exclusive designer sunglasses with polarized lenses and premium materials.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500'
  };
  
  // Display the premium products
  displayPremiumProducts();
}

// Display premium products in a special section
function displayPremiumProducts() {
  // Create premium products section if it doesn't exist
  if (!document.querySelector('.premium-products-section')) {
    const mainContent = document.querySelector('main');
    const productsSection = document.querySelector('#all-products');
    
    if (mainContent && productsSection) {
      const premiumSection = document.createElement('section');
      premiumSection.classList.add('premium-products-section');
      premiumSection.id = 'premium-products';
      
      premiumSection.innerHTML = `
        <div class="section-header">
          <h2>Premium Collection</h2>
          <p>Exclusive high-quality products for discerning customers</p>
        </div>
        <div class="products-container premium-products-container"></div>
      `;
      
      mainContent.insertBefore(premiumSection, productsSection);
      
      // Populate premium products
      const premiumContainer = document.querySelector('.premium-products-container');
      let premiumHTML = '';
      
      Object.values(products).forEach(product => {
        if (product.premium) {
          premiumHTML += createProductCardHTML(product);
        }
      });
      
      if (premiumContainer && premiumHTML) {
        premiumContainer.innerHTML = premiumHTML;
        
        // Add event listeners for quick view buttons
        addProductEventListeners(premiumContainer);
        
        // Animate premium products
        setTimeout(() => {
          premiumContainer.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, index * 100);
          });
        }, 100);
      }
    }
  }
}

// Create product card HTML with new structure
function createProductCardHTML(product) {
  return `
    <div class="product-card ${product.premium ? 'premium-card' : ''}" data-id="${product.id}" data-category="${product.category}">
      <div class="product-badge ${product.oldPrice ? 'sale' : ''} ${product.premium ? 'premium' : ''}">
        ${product.oldPrice ? 'SALE' : ''}
        ${product.premium ? 'PREMIUM' : ''}
      </div>
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${getRatingStars(product.rating)}
          <span>(${product.reviewCount})</span>
        </div>
        <div class="product-price">
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
          <span class="current-price">$${product.price.toFixed(2)}</span>
        </div>
        <button class="add-to-cart-btn full-width" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  `;
}

// Add event listeners to product buttons
function addProductEventListeners(container) {
  // Add to cart buttons
  const addToCartButtons = container.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    if (!button.hasAttribute('data-event-attached')) {
      button.setAttribute('data-event-attached', 'true');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.getAttribute('data-id');
        addToCart(productId, 1);
        
        // Add animation to the button
        button.classList.add('added');
        setTimeout(() => {
          button.classList.remove('added');
        }, 1500);
      });
    }
  });
}

// Add CSS styles for product cards
function addProductCardStyles() {
  const styles = `
    /* Premium product styles */
    .premium-products-section {
      margin: 60px 0;
      padding: 30px 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
    }
    
    .premium-card {
      border: 1px solid #e0e0e0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      transform: translateY(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .premium-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }
    
    .product-badge.premium {
      background-color: #bb9d52;
      color: white;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    
    /* Product image hover effect */
    .product-image {
      overflow: hidden;
      position: relative;
    }
    
    .product-image img {
      transition: transform 0.5s ease;
    }
    
    .product-card:hover .product-image img {
      transform: scale(1.08);
    }
    
    /* Add to Cart button at bottom of product card */
    .add-to-cart-btn.full-width {
      width: 100%;
      margin-top: 15px;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      background-color: var(--primary-color);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .add-to-cart-btn.full-width:hover {
      background-color: var(--primary-color-light);
      transform: translateY(-2px);
    }
    
    .add-to-cart-btn.full-width:active {
      transform: translateY(0);
    }
    
    .add-to-cart-btn.full-width.added {
      background-color: #4CAF50;
      animation: pulse 0.6s ease-in-out;
    }
    
    /* Animation for "Added to Cart" */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    /* Product card animations */
    .product-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .product-card.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Success message styling */
    .cart-message {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--primary-color);
      color: #fff;
      padding: 15px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .cart-message.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .cart-message i {
      font-size: 20px;
    }
    
    .cart-message p {
      margin: 0;
      font-weight: 500;
    }
  `;
  
  // Add styles to document
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}