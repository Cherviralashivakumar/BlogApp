import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types/blog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link 
            to={`/blog/${blog.id}`}
            className="hover:text-primary transition-colors"
          >
            {blog.title}
          </Link>
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {blog.author.email}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(blog.createdAt)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {getExcerpt(blog.content)}
        </p>
        
        <Link 
          to={`/blog/${blog.id}`}
          className="inline-block mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
