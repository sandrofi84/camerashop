exports.createPages = async function({actions, graphql}) {
    const {data} = await graphql(`
    query {
        allWpPost {
          edges {
            node {
              id  
              slug
            }
          }
        }
      }
    `)

    // Create Journal page

        actions.createPage({
            path: `/blog/`,
            component: require.resolve("./src/templates/blog.js")
        })


    // Create single post pages
    data.allWpPost.edges.forEach(edge => {
        const slug = edge.node.slug;
        const id = edge.node.id;

        actions.createPage({
            path: `/blog/${slug}/`,
            component: require.resolve("./src/templates/post.js"),
            context: {id}
        })
    })
}
