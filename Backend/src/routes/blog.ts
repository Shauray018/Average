import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, updatePostInput } from '@shauray03/common';
import { Hono } from 'hono';
import { use } from 'hono/jsx';
import { sign, verify} from 'hono/jwt'

// Create the main Hono app
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables: { 
        userId: string;
    }
}>();


blogRouter.use("/*" , async (c, next) => { 
	try{const Header = c.req.header("authorization") || " " ;
		if (!Header) { 
			c.json({ 
				msg : "error: you are not authorized"
			})
		}
	// bearer token
	const potentialToken = Header.split(" ")[1]
	const user = await verify(Header, c.env.JWT_SECRET)
	if (user) { 
        //@ts-ignore
        c.set("userId", user.id);
		 await next() ;
	} else { 
		c.json({ 
			msg : "error: you are not authorized"
		})
	}} catch(e) { 
        c.json({
            msg: "problem signing up"
        })
    }
} ) 



// blogRouter.post('/', async (c) => {
//     try{
//         const userId = c.get('userId');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	const { success } = createPostInput.safeParse(body); 
// 	if (!success) {
// 		c.status(400);
// 		return c.json({ error: "invalid input" });
// 	}
// 	const post = await prisma.post.create({
// 		data: {
// 			title: body.title,
// 			content: body.content,
// 			authorId: userId
// 		}
// 	});
// 	return c.json({
// 		id: post.id
// 	});
//     } catch(e) { 
//         c.json({
//             msg: "problem posting your blog"
//         })
//     }
	
// })
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Retrieve userId from context (assuming it's set by a middleware)
        const userId = c.get('userId');
        if (!userId) {
            c.status(401);
            return c.json({ error: "Unauthorized" });
        }

        // Parse and validate request body
        const body = await c.req.json();
        const { success, error } = createPostInput.safeParse(body); 
        if (!success) {
            c.status(400);
            return c.json({ error: "Invalid input" });
        }

        // Create post
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId // Ensure userId is an integer
            }
        });

        return c.json({
            id: post.id
        });

    } catch (e) {
        console.error("Error creating post:", e);
        c.status(500);
        return c.json({
            msg: "Problem posting your blog"
        });
    } finally {
        await prisma.$disconnect();
    }
});

	
blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updatePostInput.safeParse(body); 
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
		select: {
			content: true,
			title:true,
			id:true,
			author: {
				select: { 
					name: true
				}
			}

		}
	})
	return c.json({
        posts
    })
}) 

blogRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const post = await prisma.post.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: { 
                        name: true
                    }
                }
            }
        });

        if (!post) {
            return c.json({ msg: "Post not found" }, { status: 404 });
        }

        return c.json({ post });
    } catch (error) {
        console.error("Error fetching post:", error);
        return c.json({ msg: "Internal Server Error" }, { status: 500 });
    }
});

// blogRouter.delete("/", async (c) => { 
//     const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());
//     const body = await c.req.json();

//     const deleteBlog = await prisma.post.delete({
//         where: {
//             id: body.id
//         }

// })   
//      return c.json({ msg: "post deleted" });
         
// })


// blogRouter.delete("/", async (c) => {
//     try {
//       const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//       }).$extends(withAccelerate());
      
//       const body = await c.req.json();
  
//       if (!body.id) {
//         return c.json({ error: "Post ID is required" }, 400);
//       }
  
//       const deleteBlog = await prisma.post.delete({
//         where: {
//           id: body.id,
//         },
//       });
  
//       return c.json({ msg: "Post deleted", deletedPost: deleteBlog });
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       return c.json({ error: "Failed to delete post" }, 500);
//     }
//   });

blogRouter.delete("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const body = await c.req.json();

    if (!body.ids || !Array.isArray(body.ids)) {
      return c.json({ error: "Post IDs are required and should be an array" }, 400);
    }

    const deleteBlogs = await prisma.post.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });

    return c.json({ msg: "Posts deleted", count: deleteBlogs.count });
  } catch (error) {
    console.error("Error deleting posts:", error);
    return c.json({ error: "Failed to delete posts" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});