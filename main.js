Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `      
    <div class="product">
        <div class="product-image">
          <img v-bind:src="image" />
          <a v-bind:href="site">Click here for more info</a>
        </div>

        <div class="product-info">
          <h1>{{title}}</h1>
          <p>{{price}}</p>
          <!-- conditional rendering -->
          <p v-if="onSale">{{onSale}}</p>
          <p v-if="inStock">In Stock</p>
          <p v-else :class="{textDeco: !inStock}">Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <!-- end of conditional rendering -->

          <!-- Event Handling -->
          <button
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
          >
            Add To Cart
          </button>

          <button
            v-on:click='removeFromCart'
          >
            Remove from Cart
          </button>
          <!-- end of event handling -->


          <!-- list rendering -->
          <p><b>Product Description</b></p>
          <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>

          <p><b>Colours</b></p>
          <div
            v-for="(variant, index) in variants"
            :key="variant.variantID"
            class="color-box"
            :style="{backgroundColor:variant.variantColor}"
            @mouseover="updateProduct(index)"
          >
            <!-- @ is the shortform of v-on -->
          </div>

          <!-- end of list rendering -->
        </div>
      </div>`,
  data() {
    return {
      product: "Earphone",
      price: "SGD$666.00",
      onSale: 0,
      details: ["wireless", "noise reduction"],
      brand: "Porsche",
      //image:
      //   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw8NDg8PDg0PDw8PDw0ODw8PEBAQFhUWFhUVFRUYHSggGBomGxUVITIhJykrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ8QFSsdFRkrKy0rKy0tNzcrKystLSsrLTc3KysrLTc3KystNy0rKystLTcrNysrNy0rNy0rKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQEDCAL/xABEEAABAwIDBAcDCAgFBQAAAAABAAIDBBEFEiEGMUFRBxMiYXGBkUKhwRQjMlJigrHwFSRDU3KSotEIM2Oj4RY0c7PD/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAERIUH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARFCOkDpJo8EHVH9ZriLtpWOAy8jK72B3bzy4oJq9waCSQABckmwA71Ga/pDwanJbJiEDnA2IhL6ix7+qDrLzbtZtviOMOPymZ3U3u2liuyBnLsD6R73XK0LJ3N4W7iCFcHq+k6RcFm0biNO2/74up//AGBqklPUMlaHxvZIw7nscHtPgRovH1DM2S7SLOW1oJqqhf1tHPLTP3kxPLQ7+Ju53mCmD1iip/Yrphu5tNjDWxkkNbXRjLGT/rM9j+IacwN6t9rgQCCCCLgg3BCg5REQEREBERAREQEREBERAREQEREBERAREQERaHbXaeHB6OSsls5w7EMV7GaYg5WD0JJ4AEoI10t9IIweH5NTEOxKdvYFg7qIzp1rhxO8NB4i+oFj55jo3zOdPUOdJI9xe4vcXOc46kucdSVsjJNXTy4hWOzzzPLyeA5ADgALADgAsbEa5rOy3etSDqlkZHoAPALFfIHcliukLtSrF2D6J6rFY21U8nyOjfrG4szTTN+sxhsA08HHxAI1VRXzAWOBbwuR5akfHyU2wxnXxA8bKZ7QdCLYKeSajrJZJoWOlEM8bCJcgzZQ5tspNt+vxUQ2PcHANH0baKQayvobX4K2eg7aZ0sUmEzuvLStElMTvdTXsWfccQPBzRwUIxeisTYLV4Dif6NxGjrb5WxzNbNyML+xJfwa4nxaEo9QIuAuVlRERAREQEREBERAREQEREBERAREQEREBeZ+k3aY4zibmRuvRUZdFCB9FxBs+T7xGn2Wt5lXJ0ubS/ovC5nMdlqKj9Wgse0HPBzOHe1uY+Nl5ypAIY7+2dSrBkV9SI25GqOzuJNys2cl2pTA8JlxGrgoYBeWeQMBO5o3uce4NBce4LSJ50N7BjFZjWVbL4fTOADCNKiYa5O9g0J53A5r0i0AAACwGgA0ACwMAweHDqWGip25YoGBjd13He5zvtEkk95K2CxVcELzPgFOKarqaXhT1U8A1vYMe5m/7q9Mrz1jcWTH8Qj3frQf/Oxsh97lYNli0Ol+5QrHYAWO8wp5iv0R4KGYyLtPmtI9A7B4iavC6CocbvfSxZzze0ZXe9pW+UF6FJs+CUwJuY5KmPwAmeQPQhTpYUXC5RAREQEREBFwuUBERAREQcLlEQEREBEWu2ixVlBR1Na/VtPDJLl3ZiB2W+JNh5oKE6asd+XYt8lab0+Ht6vudO6zpD5dlviwqCSvzHuC6n1D5C+aQl0sz3SyPO9z3G5PqV8dZZaR8VUlgrq/w8bL5IpsXlb25i6CmvwjafnHDxcMv3DzVJ0dK+sqIaWIXknljiYPtPcGi/dqvY+C4ZHRU0FJELRQRMibzIaLXPed/mpVZqIigKi9usPl/wCpHiKJ8jqiOnlGUbzkEe/d+yPor0UAxIZsfiH1RGf5Y3u+KCHY0yWPsyRyR24SMcz0uohirrtPmvR0xY64f9G24i49FDtotkMPqAXGJrXX+lCeqdc34DQ7uIV1cdfQOT+iXA+zW1IHnlPxVjKKdG+DsoKN9PG5z2/KJX5n2zHMGnW2mmgUrUQREQEREBERARcLlAREQEREBERAREQFVv8AiDxQxYdDRtOtZUtDhzii7Z/q6tWkqn6W8PjxKupKV7pGimhklcYy2/zlhbUEXGRv8yChpncAsaV6nWJ7AZbmCrB5MniLT/Mwm/oFFcR2fq4b5mB7R7UTg8em/wBy1pib/wCH7A/lWKOrHC8dDEXj/wA0l2M/p6w+LQvSagXQxsy7DMLYZRaoq3fKZBxa1wAjb5NANuBcVPVkEREBV5I9xx2dzWGTq27mlgsOpjb7RHFxVhqt8Em6yvxCfhne0HuzkD3MCLEgqcRaL5w+PvkYQ0ffHZ961tRUBwu0hwO4g3BWXNUkbj6LT1oY4klozHe5t2OPi5tiUVLtlP8At785Hn8B8FuVqtmI8tJDv1Dna7zdxK2qMiIiAiIgIiICLhcoCIiAiIgIiICIiAqixTLV4hXSueW5JmxsyvykiMZT5XaCrZqJRGx8h3Ma5x8ALqpMJo2y0/WysY980kkri9rXG5O+58EWMLERvUbkp3zyxwMF3SyMjGtrZnBvxUgxLD2Nvkzs/he63obhNgsOMuK0+Zxc2LPNYtF7sHZuR9ot4Iq7IIhGxrGizWNa1o5ACwXYiIyIiIOitqBDFLKd0cb5D4NBPwVYbKuLIXvJ7T36nnYf3JU02/reow6c6ZpA2FoPHOQHf05j5KusLq3shYOyd5tq3efNFiRS1CwKifesV1cPaDm+WYe66+qK08sUYIcHyxsNjfQuAKKtLDIurghZxbEwHxyi6ykRGRERAREQEREBERAREQEREBERAREQafbCbq8Pq3bj1D2g97hl+KiVDT5KWAf6TD5kX+K3/SNLlw2YcXPhb/uNPwWBW0jYYm3kdG1kbQ55eLCwH17gIsRXFG71sOiymvV1M37uBrPN7r//ADUZxraGmYSG1DJu5jHOv99vZ9y7di+kiiw4T9fBVOfM9nahbC9oa0G18z2ne48EwtXgsLFsVp6KIz1UrIYm+087zyaN7j3DVQbEOmPDG00ktMZJqkWbHSvikiJcb2LnEZQ0W1IJ94VMYztDVYlMairlMj/ZaOzHGPqsZ7I954kq4i0cc6XZHksw+BrGbhUVIJce9sYOnmfJQvEtqcSqbmWuqePZikNO3wyxZQfNYGA4LU1ptCzsXsZXdlg8+PkrCw7YqClb1szhNI0Xu6zYmeR3+JThiHUFJUFmeeWaR0hGVsssj8reBs46E3UijYQABuAAXdUyxvf2SMo48/8AhdkWXmFGnTkK3WxdLnroj+7bI8+GW1vVwWK2JpWbgVcyiqGzSX6stcx7gCcoNtbcgQPK6Cy0XxFI17Q9hDmuALXNNwQdxBX2jIiIgIiICIiAiIgIiICIiAiIgIijm2u1MWFU7pXG77dlvG53acyQfQngg03TBjMVJRwiTtOkqo8sIIDntYHOd4DQXPC4VOYzjtVibzLUvOW92QNuIoxwAbz7zqtTiuMz4pVPq6hxc4nIxtyQxg1yj1HqVlHQLUgxJCBvWC+qZzusbFKkucWg2Dd5WJGLcLc990Rl5+P5CmOyOzHXZZ6kERb2Rbi/kTyb+K1ey2D9aRUSj5tp7DTueRxPcPepxU1Yiic97sjALkk2uP7KWtSNxU7Qw0UeSJrTlFgB2Y2em/wCg2K7X1Na/JHnmIOjW9mNvwCjtdiTq6Q6llODoBoX/wBgt1hcjYwGtAa0ctAmFrIpcFrptZalsI+qwF59dAsibB54RdtbOT4RW97Vl0mK5jlhjkncNCWANYD3vOgWTMyslH+XTx9z5JHn1a0hXidR/wDTVfTnSZkwHsyxgE+bLfgt5g22ENQ5sFSPk0rjlaXkOheeQfwPcbLWVmBVZucsT+6Nzgf6wAoziVO5l2SsLTxDh+fVQ2r42ZxJ9DIInkmkebEH9i4+0OTefrzVhLz30Y7SGR36MqXZnBpNLK43LmtFzEeZA1HcDyCvDZ+oLourcbuis2/Nvs+7TyUVtEREQREQEREBERAREQEREBERB0V1UyniknkNmRMc93g0X0715x6VsZkqJYmSHtdWKiRgOjXy6tb92MMA8TzV29IM36qynBt8omjY4/Viac73HuGUeq82bZVwqqyolbqx8zgwjd1bewz+kNVh4+cLi0HgD5nX4geSzK5+RhPIJQN3/wATvxXxjLCWZRxsPDvVRHQL2cd7iXfAfH1WzwHC/lUtjpGyzn23kcAPFYDm28PgucNxV9LMJWAOG50brgOb5biirUpYGtbcgNiYLAbhpw8FAdrceNZJ1MZ+YYdTweR8F3Y/tcauNsMDHQtI+cJIv4C3DvUea0AKSLayqaS1gPAAKbbNbLyVQEs92Qb2tFwX945Dv9LcerYDZI1L/lE7fmWGxB9tw9jwHHv04FWu2nAFgLDdolpI1FPhzImhjGhrQNAAu3qFs+oXyYVFa/qVg4rg0dUwseLGxyvAGZp+I7txW8MS46tBR2IwS4VWRygWfBMyQWJAJaQ6wP1XN/EjgvTmBH5wkfRcy/vBH4lUt0n4fnELmtu97XR2G8lrm5R/uO9VdmAw5bD6kYbf0HwVqN0iIogiIgIiICIiAiIgIiICIiDS7V4cyemlc55jMUUrg8AEAWubjl2R6LybkLxm4nW3JesttJxFhle86Wo6geZjcB7yvMdNTcFYPvDJAQfG/rqsivZdun54LByGB9iNNSPDitgJA9tlUaR9KXG3DUnwH/PxWBV0ZBUzoqDM17rcWtHhlDvxcVr6+htfRBGGMyqU7EbMSYjMN7YWWc+Qey3hb7R4ct/JYWDYFJW1UdNGAXOOt75QN5LreyBqfIcV6AwHBIqGBsEQ0Grnn6T3ne53eVLVkc0dBHBGyKJoZGxoa1o3ABd/UrK6tdkMGchu6+88hxKy015jXyYluDRg7myWvbMGte31aVhzRgOcBq0GwPO28+t/IBUYBjXwY1mOasPEKqOnjfNK7LGxuZx+A5nhbvQaGtohV4jRwHVlO11XL4BzerHm5is/C4srMx3v18uH9/NQ/YbCJJDLW1DS2Spc17mHfHCB83F421Pip4iURERBERAREQEREBERAREQEREEY6TI3Pweva3eYPcHNJ911QmER9Y0G3aFrj8Pz3L0xidG2pgmp3/RmikiJ5BzSL+9ebnRPopnNkaQ5j3RSs5OaSHD1FwVYO7EMNErLbnDVp4gqKPkfE4tOjm/Sb3fWbzH4KcSzDKHNNwdx/PFR3GadkwvucNQRoQfFVG6wCpbLDmHE/gAPgsupog/h3nwUOwOtdTPMbx2Hm4eNAHd471LoK0Oa4X1LXAeYVEh6JcKGSornDtSSGKM8mNsXerjb7gVjNYon0WkfoyMDe2WfN4mQu/AhTBYrb5yJlIvYkXFj3jku0BCFBiujHIeNl8OCyXBdEgQYszw0FxIAAJJOgAG8laPCKF+MTtncCKGF2aBjhpK8ftnjl9VvmsimpTjM7oW3GGU77VMg0FVKP2DD9Qe0eO5T6np2RNyRsbG36rAGj0CqWuYYmxtDWiwH5uV2IiIIiICIiAiIgIiICIiAiIgIiICrjpM2QdNmr6Zhc7KPlMLB2nBo0kZ9oAC45Aedjog8ovqJYHlv+ZC7UOGg3cRwPf5cl1mpD9QfEHePJXhtx0ZxV+aooy2nqXXL43D5iV3PTVju8ad1zdUftJspX4e49fBLDYm0haXRnwkb2ffda1GLMdV301aWHjYbjxWshEj7Xcy9iblwA013m2q7aVkszgyKKSR53MjY+R3oAgsjo42njpJX08zg2mncHMkJ7Mcu7tcmkW14Ea79LdaVQeHdHuNzOGSifE0loL53siaLkC5BOY2vfQHcVbGCbF4pQwMbFicUj2tsaaemc+mbyDHB4kaLaaEDuClalSgLlarq8YboaTD5Ob2108Q8mmB34ruGH4pJa76GlF9S1s9Y+3dcxgHxB8FMXWRUTNja573NYxou57iGtaOZJ3LSsinxbsQF9Ph50krLFkk7eLacHUA/vD92+9bmm2SgzNlq3y18rTmaaotMTHXuCyBgEYI4HKXd6kCJrooKKKmiZBAxscMbQ1jGiwA/PFZCIiCIiAiIgIiICIiAiIgIiICIiAiIgIiIC4cAdCLg8CuUQa2XAKF5zPo6VzubqeIn1ssumpIoRlijjiHKNjWD0AXeiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLhEQcoiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP//Z",
      site: "https://www.porsche-design.com/en/Electronics/Sound/Headphones/",
      inventory: 0,
      variants: [
        {
          variantID: 1,
          variantColor: "Silver",
          variantQuantity: 10,
          variantImage:
            "data:image/jpeg;base64,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"
        },
        {
          variantID: 2,
          variantQuantity: 0,
          variantColor: "Black",
          variantImage:
            "https://www.porsche-design.com/out/pictures/generated/product/1/470_470_100/sow_blk_1_rgb.jpg"
        }
      ],
      selectedVariant: 0
    };
  },
  //creating methods that could be called with event-handling
  methods: {
    addToCart: function() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantID);
      //the Cart is a global attribute that is not in this product component
      //the $emit is needed to tell the parent element that something has to be done to the cart
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index); //update the product image based on the variant that is hovered on
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantID
      );
    }
  },

  //computed property --> cached, more efficient
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
      console.log(this.cart);
    },
    removeItem(id) {
      this.cart.splice(this.cart.indexOf(id), 1);
      console.log(this.cart);
    }
  }
});
