<h1>CAMERASHOP</h1>

<br />

<h2>Intro</h2>

<br />

My [first project](https://www.hodostraining.com/) left me wanting to explore [Gatsby](https://www.gatsbyjs.com/)’s capabilities further.

<br />

Gatsby is a static site generator, but the websites it creates are all but static. While the files on the server are indeed static, the website becomes dynamic once it is loaded in the browser. The reason for this is that React is at its core, so Gatsby takes advantage of [React’s hydration](https://reactjs.org/docs/react-dom.html#hydrate) feature. This allows you to make API calls from the browser to pull new content in, while retaining all the advantages of a static website - **fast loading, great SEO and higher security**.

<br />

For my second project I was looking for something a little more challenging, but that could be a good use case for a real-world scenario.

<br />

I decided to make an **e-commerce website for a small business**.

<br />

At this point the main question was: how to manage payments? I could have built a shopping cart myself, but going down this route would have meant running a server and a database - _where to save transaction and user data_ - with all the security-related problems that this brings.

<br />

I wanted to build something that was not only easy to manage, but also not expensive, as I had the needs of a starting business in mind.

<br />

<h2>The Shopping Cart</h2>

<br />

Enter [Snipcart](https://snipcart.com/) - _a very simple shopping cart you plug into your website and it takes care of the whole check-out process_. It also has a backend where you can manage your inventory, run abandoned-cart recovery campaigns, check sales stats and more.

<br />

You cannot create products directly in Snipcart’s backend. To load them into its system - _and be able to manage the stock_ - each product has to have its own page on your website, at which point Snipcart can detect it - _by crawling the pages_ - and load it in the system.

<br />

Gatsby can generate pages programmatically, using GraphQL to pull all the information from either local files - _markdown works great_ - or remotely - _from a database through a server or a CMS_. For usability’s sake I decided for the latter.

<br />

[Contentful](https://www.contentful.com/) was my choice, as it allows to create/modify and store the products’ information along with images easily, and it integrates well with Gatsby through a plugin. I implemented a webhook that triggers a build of the site whenever a new asset - _product or blog post_ - is published on the CMS.

<br />

Now, once your products are loaded into Snipcart’s backend - _and you have added stock amounts_ - you can query for product availability to show the customers every time they open the shop page. I do this using a **serverless function**, which is one of the services offered by [Vercel](https://vercel.com/), the platform I deployed the website to.

<br />

<h2>A Stateful Layout</h2>

<br />

I implemented **a filtering and a sorting system** for shop products to make the shop page easier to navigate. This meant putting in place a **state management system** at App level - _as opposed to just in the Shop page_ - if I wanted to persist filter/sort preferences through page changes. This is done in Gatsby by wrapping all pages in a component - _usually the layout_ - which would hold state info and provide it to its children. I used [Immer](https://immerjs.github.io/immer/) for state management, it is very easy to use and works great for a simple website like this.

<br />

The website, at this point, was fully functional.

<br />

But there was one thing that was bugging me.

<br />

<h2>Real-time Updates</h2>

<br />

When you add an item to Snipcart’s shopping cart, it will inform you in the case that the item is no longer available, because it checks against your stock availability in its system, so there is no chance that somebody buys a product that is not available anymore. But - _since we query for the latest product availabilty only upon opening the shop page_ - in the case where a product is purchased while you were browsing the shop, you would still be able to add it to the cart, only to have Snipcart inform you that the item is no longer available.

<br />

This would cause a bad customer experience.

<br />

I wanted to **show the actual product availability in real-time**.

<br />

After some research, I decided to implement a subscription system based on **Websockets** technology.

<br />

The idea was that, upon opening the Shop page, the browser would not only get the latest stock availability from Snipcart, but it would also establish a connection via Websockets to a server, which would send a message every time a product is successfully purchased - _prompting the browser to check the stock again_.

<br />

There were a few different ways I could have gone about this, all with pros and cons - _not the least of which was the cost, in my case_ - but I wanted to try [AWS AppSync](https://aws.amazon.com/appsync/) to learn something new.

<br />

AppSync is basically **a GraphQL server you can configure**, which clients can connect to via Websockets to subscribe for content that is published in real-time - _this is known as pub/sub pattern_. The new content is published through GraphQL mutations, which you can make via an HTTP post request.

<br />

Snipcart allows you to configure a webhook so that, when a purchase is completed, it will send an HTTP post request - _containing all the information about the purchase_ - to an endpoint of your choice.

<br />

I hooked it up with a **NodeJS server** that would request the new stock and then prompt a mutation on AppSync, which would, in turn, send the new stock to each client to check for stock availability.

<br />

Et voilà.

<br />

<h2>Conclusion</h2>

<br />

The most challenging part of the project was deciding what structure made more sense for the real-time updates to the Shop page. There are some platforms that offer websocket-as-a-service - like [Pusher](https://pusher.com/), [Ably](https://ably.com/) or [Piesocket](https://www.piesocket.com/) - which would have made more sense in a JAMStack architecture. But I wanted to challenge myself and learn something, so I went with a NodeJS server connected to AWS AppSync, which is highly scalable - _in case the business takes off!_
