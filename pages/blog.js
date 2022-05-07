import React, { useEffect } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);
  const fetchData = async () => {
    const d = await fetch(
      `http://localhost:3000/api/blogs/?count=${count + 2}`
    );
    setCount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };

  return (
    <main className={styles.main}>
      <InfiniteScroll
        dataLength={blogs.length} //This is important field to render the next data
        next={fetchData}
        hasMore={props.allCount !== blogs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {blogs.map((blogitem) => {
          return (
            <div key={blogitem.slug}>
              <Link href={`/blogpost/${blogitem.slug}`}>
                <div className="blog">
                  <h3 className={styles.blogItemh3}>{blogitem.title}</h3>
                  <p className={styles.blogItemp}>
                    {blogitem.content.substr(0, 140)}
                  </p>
                  <button className={styles.btn}>Read More</button>
                </div>
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>
    </main>
  );
};
export async function getStaticProps() {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }

  // Pass data to the page via props
  return { props: { allBlogs, allCount } };
}
export default Blog;
