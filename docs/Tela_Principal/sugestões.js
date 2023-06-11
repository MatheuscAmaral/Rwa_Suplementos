const products = [
    {
        id: 1,
        title: 'Whey Pro Max Titanium',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/whey-pro-max.png'
    },
    
    {
        id: 2,
        title: 'Whey Protein Concentrado Dux',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/logo dux.png'
    },

    {
        id: 3,
        title: 'Whey Isolate Definition Body Action',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/isolate_definition_bopy-action-.png'
    },

    {
        id: 4,
        title: 'Whey 100% Integral Médica',
        price: 120.0,
        poster:'/docs/Tela_Principal/Imagens/whey-100-pouch-900g-baunilha-integralmedica.png'
    },

    {
        id: 5,
        title: '100% Whey Max Titanium',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/100 whey max.png'
    },

    {
        id: 6,
        title: 'Isolate Prime Whey Body Action',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/isolate_prime_whey_bodyaction.png'
    },

    {
        id: 7,
        title: '100% Whey Body Nutri',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/100_-whey-body-nutri-.png'
    },

    {
        id: 8,
        title: '100% Whey Body Action',
        price: 120.0,
        poster: '/docs/Tela_Principal/Imagens/100 whey body action.png'
    },

    {
        id: 9,
        title: 'Creatine HD Muscle Hd',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/creatina hd muscle hd.png'
    },

    {
        id: 10,
        title: 'Creatine Turbo Black Skull',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/creatine_black_skull-.png'
    },

    {
        id: 11,
        title: 'Creatine 5.0 Muscle HD',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/creatina 5.0 muscle hd.png'
    },
    
    {
        id: 12,
        title: 'Creatine Body Nutri 300g',
        price: 99.90,
        poster: '/docs/Tela_Principal/Imagens/creatine double force.png'
    },
    
    {
        id: 13,
        title: 'Creatine Max Titanium',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/creatina-150g-max-titanium.png'
    },

    {
        id: 14,
        title: 'Creatine Integral Médica',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/creatina integral medica.png'
    },

    {
        id: 15,
        title: 'Pré-Treino No Control',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/no_control_-.png'
    },

    {
        id: 16,
        title: 'Zma Black Skull',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/ZMA-BLACK-SKULL-120-CAPS.png'
    },

    {
        id: 17,
        title: 'Ripzzz Black Skull',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/ripzzz-triptofano-.png'
    },

    {
        id: 18,
        title: 'Triptofano New Nutrition',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/triptofanonewnutrition.png'
    },

    {
        id: 19, 
        title: 'Complexo B New Nutrition',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/complexo-b-120.png'
    },

    {
        id: 20,
        title: 'Thermo cut HD Muscle Hd',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/thermo-cut-hd-.png'
    },

    {
        id: 21,
        title: 'Psillium Ocean Drop',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/pssilium_ocean_drop-.png'
    },

    {
        id: 22, 
        title: 'Barra de Proteina Muscle HD',
        price: 89.90, 
        poster: '/docs/Tela_Principal/Imagens/protein-bar-.png'
    },

    {
        id: 23,
        title: 'Ômega 3 Catari',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/omega-3-catarinense-.png'
    },


    {
        id: 24,
        title: 'CoQ10 Body Nutri',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/-q-10_body_nutri-.png'
    },


    {
        id: 25,
        title: 'Glutamina Black Skull',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/glutamina black skull.png'
    },
    
    {
        id: 26,
        title: 'Maca Peruana Body Nutri',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/maca_peruana_body_nutry-.png'
    },


    {
        id: 27,
        title: 'Equilibrium Body Nutri',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/equilibrium-.png'
    },


    {
        id: 28,
        title: 'Bcaa Age',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/bcaaa_age-.png'
    },

    {
        id: 28,
        title: 'Ômega 3 Muscle HD',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/omega_3musclehd-.png'
    },

    {
        id: 29,
        title: 'Probiotic10 SunFood',
        price: 89.90,
        poster: '/docs/Tela_Principal/Imagens/sunfood_probiotico.png'
    }
]

const formatter = Intl.NumberFormat('pt-BR', {
    style: "currency",
    currency: 'BRL',
    maximumFractionDigits: 2,
})


const listContainer = document.querySelector('#list');
const header = document.querySelector('#header');
const search = document.querySelector('#search');

function render(products){
    let list = '';

    if (products.length <= 0) {
        lit += `<div id="no-products"> Nenhum produto disponível</div>`;
    }
    
    else {
        products.forEach((product, index) => {
          
            list+=`
            <div class="product">
            <div class="product-image">
            <img src="${product.poster}" alt="" width="10%"
            </div>
            ${product.title} - ${formatter.format(product.price)}
            <a href="">
                <div class="product-button" data-id="${product.id}">
                    Remove
                </div>
            </a>
            </div>
            `
        })
    }
    listContainer.innerHTML = list;
}

function removeProduct(productId) {
    const index = products.findIndex((product) => {
        return +product.id == +productId;
    });

    if(index > -1){
        products.splice(index, 1);
        render(products);
    }
}

document.body.addEventListener('click', function (event) {
    event.preventDefault();
    
    const productId = event.target.getAttribute('data-remove');
    if (productId) {
        removeProduct(productId);
    }
});
render(products);