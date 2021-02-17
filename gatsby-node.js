exports.createPages = async function({actions, graphql}) {
    const {data} = await graphql(`
    query {
      allPosts: allContentfulBlogPost(sort: {order: DESC, fields: dateAdded}) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allProducts: allContentfulProduct {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `)

    // Create Blog page

    actions.createPage({
        path: `/blog/`,
        component: require.resolve("./src/templates/blog.js")
    })

    // Create Shop page

    actions.createPage({
      path: `/shop/`,
      component: require.resolve("./src/templates/shop.js")
    })


    // Create single post pages
    data.allPosts.edges.forEach(edge => {
        const slug = edge.node.slug;
        const id = edge.node.id;

        actions.createPage({
            path: `/blog/${slug}/`,
            component: require.resolve("./src/templates/post.js"),
            context: {id}
        })
    })

    // Create single product pages
    data.allProducts.edges.forEach(edge => {
      const slug = edge.node.slug;
      const id = edge.node.id;

      actions.createPage({
          path: `/shop/${slug}/`,
          component: require.resolve("./src/templates/product.js"),
          context: {id}
      })
  })
}
