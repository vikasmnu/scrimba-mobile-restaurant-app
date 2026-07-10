import menuArray from './data.js'

const menuContainer = document.querySelector('.menu-container')
const orderContainer = document.querySelector('.order-container')

let order = []

renderMenu()

function renderMenu() {
    menuContainer.innerHTML = menuArray.map(item => `
        <div class="items-container">

            <div class="emoji">${item.emoji}</div>

            <section class="details-container">
                <h2>${item.name}</h2>

                <p class="ingredients">
                    ${item.ingredients.join(', ')}
                </p>

                <p class="price">
                    $${item.price}
                </p>
            </section>

            <button
                class="add-to-order-button"
                data-add="${item.id}">
                +
            </button>

        </div>
    `).join('')
}

document.addEventListener('click', function(e){

    if(e.target.dataset.add){
        addItem(Number(e.target.dataset.add))
    }

    if(e.target.dataset.remove){
        removeItem(Number(e.target.dataset.remove))
    }

    if(e.target.id === 'complete-order-btn'){
        document.querySelector('.modal-container').style.display = 'block'
    }

})

function addItem(id){

    const selectedItem = menuArray.find(
        item => item.id === id
    )

    order.push(selectedItem)

    renderOrder()
}

function removeItem(id){

    const index = order.findIndex(
        item => item.id === id
    )

    if(index !== -1){
        order.splice(index,1)
    }

    renderOrder()
}

function renderOrder(){

    if(order.length === 0){
        orderContainer.style.display = 'none'
        return
    }

    orderContainer.style.display = 'block'

    const orderHtml = order.map(item => `
        <li class="order-row">

            <div class="item-details">

                <span>${item.name}</span>

                <button
                    class="remove-button"
                    data-remove="${item.id}">
                    remove
                </button>

            </div>

            <span>$${item.price}</span>

        </li>
    `).join('')

    document.querySelector('.order-list').innerHTML = orderHtml

    renderTotal()
}

function renderTotal(){

    const total = order.reduce(
        (sum,item) => sum + item.price,
        0
    )

    document.querySelector('.total-container').innerHTML = `
        <div class="total-row">
            <h3>Total Price:</h3>
            <h3>$${total}</h3>
        </div>

        <button id="complete-order-btn">
            Complete Order
        </button>
    `
}

document
    .querySelector('.modal-form')
    .addEventListener('submit', function(e){

        e.preventDefault()

        const customerName =
            document.querySelector('.full-name').value

        document.querySelector('.modal-container').style.display = 'none'

        orderContainer.style.display = 'none'

        document.querySelector('.success-message-container').style.display = 'block'

        document.querySelector('.success-message').textContent =
            `Thanks, ${customerName}! Your order is on its way.`
    })