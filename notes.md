# Code Review I

## Collaboration

Roses

* Pair Programming, OAuth
* Good communication x2
* Git, collaboration x3
* Successful merges, fullstack data flow in action

Thorns

* Remote working x2
* Uncertainty for tasks to prioritize

### GIT

Semantic Commits

* Nature of commit (e.g, feat, doc, debug, test, etc.)
* Area of commit coverage (models, routes, React, docs, etc)
* Present-tense description of what commit does

### README

* Title, project description
* Add y'all as collaborators
* Deployed Link
* Instructions for running locally

### User Stories

* (B)etsy-style user stories

As an X, I want to Y by Z
* Each User story will 1+ Vertical Slices
* Write tasks horizontally based on vertical slices
* Horizontal tasks should take ~15mins-2hrs of worktime

As an Admin I want to Delete Products from Inventory so I can manage my Business

* Get All Products
    - Product Model
    - Admin Prop on User Model
    - Get Products Route
    - Product List Component

* Delete Product
    - Delete Button (for Admins)
    - Thunk to AJAX Delete


## Codebase

### Models

````
Users

id      name
0       dan
1       betsy
2       jenny

Orders

id      u_id
0       1 
1       2
2       1
3       0

Plants

id      name
0       fig
1       cactus
2       fern
3       pothos

line-item (define in many-to-many as : 'line-item')
Also define Schema w/ identical name, adding quant property

id         o_id     p_id        quant
0           1       3               5
1           1       2               2
2           2       0               1000
3           2       1               3
4           3       3               16
5           3       1               2

````

* Good job using `ENUM` instead of `Array`
* Let's think about `FLOAT`
* Instead use `INTEGER` as pennies or `DECIMAL` to 2 places
* Consider adding default values for Img... your front-end will thank you
* Consider user `faker.js` library for seeding looots of plants (pun intended)

### Routes

* Careful of passing `req.body` directly into Promises! Destructure the specific properties you need for the CRUD function
* Sounds like we are mindful of routes that need auth gates
* Routes look RESTful!


GET www.netflix.com/shows/queerEye/episodes/2?time=55

REpresentation
State
Transfer

### REACT

* Conditional rendering?
``` javascript

class ProductList {

    render() {
       return (
            <div>
                {
                    products.map(prod => {
                        <div>
                            <h2>{prod.name}</h2>
                            <img src={prod.img} />
                            {
                                this.state.user.isAdmin ? <button>Delete </button> : null
                            }
                        </div>
                    })
                }
            <div>
            )
    }

}
```
## Goals

* For our next CR: Deployed MVP (Tier I)
* Minimum Viable Product