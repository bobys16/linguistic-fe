'use client';

// Journal/Reflections Page
import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import {
  useReflections,
  useCreateReflection,
  useUpdateReflection,
  useDeleteReflection,
} from '@/hooks/useReflections';
import { formatDate, formatTime } from '@/lib/utils';
import { Reflection } from '@/lib/types';

function JournalContent() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { data, isLoading, refetch } = useReflections();
  const createReflection = useCreateReflection();
  const updateReflection = useUpdateReflection();
  const deleteReflection = useDeleteReflection();

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreate = async () => {
    if (!content.trim()) return;

    try {
      await createReflection.mutateAsync({ content, tags });
      setContent('');
      setTags([]);
      setShowCreateForm(false);
      refetch();
    } catch (error) {
      alert('Failed to create reflection');
    }
  };

  const handleEdit = (reflection: Reflection) => {
    setEditingId(reflection.id);
    setContent(reflection.content);
    setTags(reflection.tags || []);
    setShowCreateForm(true);
  };

  const handleUpdate = async () => {
    if (!editingId || !content.trim()) return;

    try {
      await updateReflection.mutateAsync({
        id: editingId,
        data: { content, tags },
      });
      setContent('');
      setTags([]);
      setEditingId(null);
      setShowCreateForm(false);
      refetch();
    } catch (error) {
      alert('Failed to update reflection');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reflection?')) return;

    try {
      await deleteReflection.mutateAsync(id);
      refetch();
    } catch (error) {
      alert('Failed to delete reflection');
    }
  };

  const handleCancel = () => {
    setContent('');
    setTags([]);
    setEditingId(null);
    setShowCreateForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Learning Journal"
        description="Reflect on your learning experiences and track your insights"
        actions={
          !showCreateForm && (
            <Button onClick={() => setShowCreateForm(true)}>
              New Reflection
            </Button>
          )
        }
      />

      {showCreateForm && (
        <Card className="mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {editingId ? 'Edit Reflection' : 'New Reflection'}
            </h3>

            <Textarea
              label="Your Reflection"
              placeholder="Share your thoughts, insights, and observations..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="info">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-800 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={editingId ? handleUpdate : handleCreate}
                disabled={!content.trim()}
              >
                {editingId ? 'Update' : 'Create'} Reflection
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {data?.reflections && data.reflections.length > 0 ? (
          data.reflections.map((reflection) => (
            <Card key={reflection.id}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      {formatDate(reflection.createdAt)} at {formatTime(reflection.createdAt)}
                    </p>
                    {reflection.tags && reflection.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {reflection.tags.map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(reflection)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(reflection.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <p className="text-gray-900 whitespace-pre-line leading-relaxed">
                  {reflection.content}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p className="text-center text-gray-600 py-8">
              No reflections yet. Start by creating your first reflection!
            </p>
          </Card>
        )}
      </div>

      {(data?.total ?? 0) > (data?.reflections?.length ?? 0) && (
        <div className="mt-6 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
}

export default function JournalPage() {
  return (
    <ProtectedRoute>
      <JournalContent />
    </ProtectedRoute>
  );
}
