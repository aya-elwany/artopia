document.addEventListener("DOMContentLoaded", function() {
    const framesContainer = document.getElementById('images-Frames');
    const hoopsContainer = document.getElementById('images-hoops');
    const capsContainer = document.getElementById('images-caps');
    const cartSection = document.getElementById('Cart');
    const closeCartButton = document.getElementById('close-cart');
    const closeWishlistButton = document.getElementById('close-wishlist');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const wishlistSection = document.getElementById('Wishlist');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const emptyWishlistMessage = document.getElementById('empty-wishlist-message');

    const cartItems = [];
    const wishlistItems = [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price}`;
                cartItemsContainer.appendChild(li);
            });
        }
        cartTotalElement.textContent = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    }

    function updateWishlistDisplay() {
        wishlistItemsContainer.innerHTML = '';
        if (wishlistItems.length === 0) {
            emptyWishlistMessage.style.display = 'block';
        } else {
            emptyWishlistMessage.style.display = 'none';
            wishlistItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price}`;
                wishlistItemsContainer.appendChild(li);
            });
        }
    }

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const sections = [
                { data: products.shop.frames, container: framesContainer },
                { data: products.shop.hoops, container: hoopsContainer },
                { data: products.shop.caps, container: capsContainer }
            ];

            sections.forEach(section => {
                section.data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('image-containers');

                    itemDiv.innerHTML = `
                        <img src="${item.imageLink}" alt="${item.description}">
                        <div class="text">${item.description}<br>${item.price}</div>
                        <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                        <button class="wishlist"><i class="fa-solid fa-heart-circle-plus"></i></button>
                    `;

                    section.container.appendChild(itemDiv);

                    const addToCartButton = itemDiv.querySelector('.add-to-cart');
                    const wishlistButton = itemDiv.querySelector('.wishlist');

                    addToCartButton.addEventListener('click', function() {
                        const product = {
                            name: item.description,
                            price: parseFloat(item.price.replace('EGP ', ''))
                        };
                        cartItems.push(product);
                        updateCartDisplay();
                        cartSection.style.display = 'block';
                    });

                    wishlistButton.addEventListener('click', function() {
                        const product = {
                            name: item.description,
                            price: parseFloat(item.price.replace('EGP ', ''))
                        };
                        wishlistItems.push(product);
                        updateWishlistDisplay();
                        wishlistSection.style.display = 'block';
                    });
                });
            });
        })
        .catch(error => console.error('Error fetching the products:', error));

    closeCartButton.addEventListener('click', function(event) {
        event.preventDefault();
        cartSection.style.display = 'none';
    });
    closeWishlistButton.addEventListener('click', function(event) {
        event.preventDefault();
        wishlistSection.style.display = 'none';
    });
    document.querySelector('.fa-cart-shopping').addEventListener('click', function() {
        cartSection.style.display = 'block';
    });

    document.querySelector('.fa-heart').addEventListener('click', function() {
        wishlistSection.style.display = 'block';
    });
    document.getElementById('confirm-order').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Your order has been confirmed!');
    });

    document.querySelectorAll('.nav-links ul a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const linkFrames = document.getElementById('link-Frames');
    const linkHoops = document.getElementById('link-Hoops');
    const linkCaps = document.getElementById('link-Caps');
    const sectionFrames = document.getElementById('Frames');
    const sectionHoops = document.getElementById('hoops');
    const sectionCaps = document.getElementById('caps');

    linkFrames.addEventListener('click', function() {
        sectionFrames.scrollIntoView({ behavior: 'smooth' });
    });

    linkHoops.addEventListener('click', function() {
        sectionHoops.scrollIntoView({ behavior: 'smooth' });
    });

    linkCaps.addEventListener('click', function() {
        sectionCaps.scrollIntoView({ behavior: 'smooth' });
    });
});
