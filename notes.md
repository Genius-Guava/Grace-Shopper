# Code Review II


## MVP Review

* Remove Redux logging middleware from production code
* Nice design, responsiveness
* User notification for adding to cart
* Excellent Crud features on Admin User 
* Need Hamburger menu in nav bar

## Code Quality

* Leverage Reponsive Design
    Define breakepoints, leverage Media Queries

* Glad to see we implemented schema design updates from last time :)

* Testing!
    * Good to have _something_ in general
    * For server-side, Mocha + chai, are really all you need. (Supertest is good if you need to stub out your entire Express API)
    * On the front-end (REACT), I recommend `enzyme`
        * tests if Virtual DOM nodes are created, on the server side
        * Use to ensure component hierarchy, structure is as intended
        * Fire synthetic events, and make sure state updates as expected
    * Redux, can be tested entirely w/ mocha/chai
    * `stub`
        * Replacement for a piece of data, or functionality
        ```javascript
        let testAdmin = {name : "Herb", id : 500, isAdmin : true}
        req.user = testAdmin
        ```
    * `spy`
        * Function that wraps another function, and tells if you if that callback is invoked
        * Great for testing, if certain middleware is hit, lifecycle methods invoked, etc.
        * `sinon` is a decent library for spies (but you can write your own)
    * `mock` 
        * Like a stub, but for a function
        * Great if you want to avoid polluting your db
        ```javascript
        const mockPlant = () => {name : 'hydrangea', id : 55}
        let testPlant = mockPlant() // instead of Plant.create()

        ```

    * PropTypes
        * Good exposure for `strongly typed` components
    
    * Like that we are using the user on the redux store for front-end conditional rendering



## Remaining Tasks

* Unauthenticated users
    * either prompt for logging in when they add to cart
    * Store cart in `localStorage` and merge w/ cart on login
* Add User Link to nav bar for Admins

## Feature Roadmap

* Give some feedback when item is added to cart
    * Span w/ # of items in nav bar
    * Change in button styling or text
    * Toast Notifications!

* Span Approach

```javascript
class Navbar {
    render() {
        return <Link>Cart {this.state.cart.lineItems.length >= 0 ? this.state.cart.lineItems.length + 1 : '0'} </Link>
    }
}
```

* Toast approach

    * lots of React libraries
    * But if we want to roll our own....
```jsx
    class Toast {
        constructor() {
            this.state = {
                message : ''
            }
        }

        componentDidMount() {
            if(this.state.message) {
                setTimeout(() => {
                    this.setState({message : ''})
                }, 2500)
            }
        }

        render() {
            return (
                <div>
                    {this.state.message}
                </div>
            )
        }
    }
    ```

You can even do it in CSS!
* transition property

```css

.toast {
  position: absolute
  transition: bottom 2s;
  bottom: -2000px
}

.toast.active {
    bottom: 20px
}

```

* Winter plant sales event!
* Customer who enters promocode at checkout, gets 50% total order
Promocode = "GetWellGouda"

* Reference cart total
* Form component + validation

Second Tier
* Admins can update Promo Code for future sales events
* Promo Code is hidden from snooping users (in browser and github repo)
* Store a record of orders that used Promo Code for marketing team to analyze
