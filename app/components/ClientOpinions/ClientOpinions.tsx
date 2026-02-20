"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ClientOpinions.module.css";
import LeaveCommentForm from "./LeaveCommentForm";

interface Comment {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ClientOpinions() {
  const t = useTranslations("clientOpinions");

  // Mock initial comments (will be replaced with database/API later)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Exceptional work on our kitchen renovation. The team was professional, punctual, and the quality exceeded our expectations.",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Michael Chen",
      rating: 5,
      comment:
        "From design to completion, everything was handled with care and precision. Our new bathroom is exactly what we envisioned.",
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      rating: 4,
      comment:
        "Great experience overall. The renovation transformed our living space beautifully. Highly recommend their services.",
      date: "2024-01-05",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleNewComment = (commentData: Omit<Comment, "id" | "date">) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };

    setComments([newComment, ...comments]);
    setShowForm(false);
  };

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className={styles.opinionsContainer}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Client Testimonials</h2>
            <div className={styles.stats}>
              <div className={styles.rating}>
                <span className={styles.ratingNumber}>{averageRating}</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={
                        i < Math.round(Number(averageRating))
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className={styles.reviewCount}>
                {comments.length} {comments.length === 1 ? "Review" : "Reviews"}
              </span>
            </div>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className={styles.leaveReviewButton}
            >
              Leave a Review
            </button>
          )}
        </div>

        {/* Leave Comment Form */}
        {showForm && (
          <div className={styles.formSection}>
            <LeaveCommentForm
              onSubmit={handleNewComment}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Comments Grid */}
        <div className={styles.commentsGrid}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.authorAvatar}>
                    {comment.name.charAt(0)}
                  </div>
                  <div>
                    <div className={styles.authorName}>{comment.name}</div>
                    <div className={styles.commentDate}>
                      {new Date(comment.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.commentRating}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={
                        i < comment.rating
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className={styles.commentText}>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
