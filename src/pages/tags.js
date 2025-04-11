import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import tagsData from '@site/src/data/tags.json';

export default function TagsPage() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title="All Tags" description="List of all tags in the documentation">
            <main className="container margin-vert--lg">
                <h1>📚 All Tags</h1>
                <ul>
                    {tagsData.map((tag) => (
                        <li key={tag}>
                            <a href={`/docs/tags/${tag.toLowerCase()}`}>{tag}</a>
                        </li>
                    ))}
                </ul>
            </main>
        </Layout>
    );
}
