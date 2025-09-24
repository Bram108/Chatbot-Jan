import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, Calendar, Filter } from 'lucide-react';
import { format, isWithinInterval, addDays, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export interface Deadline {
  id: string;
  titel: string;
  datum: string;
  label: 'urgent' | 'important' | 'normal' | 'low';
  notities: string;
}

const STORAGE_KEY = 'deadlines-board';

export const DeadlinesBoard: React.FC = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [filter, setFilter] = useState<'all' | '7days' | '30days'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [formData, setFormData] = useState({
    titel: '',
    datum: '',
    label: 'normal' as Deadline['label'],
    notities: ''
  });

  // Load deadlines from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDeadlines(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading deadlines:', error);
      }
    }
  }, []);

  // Save deadlines to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deadlines));
  }, [deadlines]);

  const filteredDeadlines = deadlines
    .filter(deadline => {
      if (filter === 'all') return true;
      const deadlineDate = parseISO(deadline.datum);
      const now = new Date();
      const days = filter === '7days' ? 7 : 30;
      return isWithinInterval(deadlineDate, {
        start: now,
        end: addDays(now, days)
      });
    })
    .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDeadline) {
      setDeadlines(prev => prev.map(d => 
        d.id === editingDeadline.id 
          ? { ...editingDeadline, ...formData }
          : d
      ));
    } else {
      const newDeadline: Deadline = {
        id: Date.now().toString(),
        ...formData
      };
      setDeadlines(prev => [...prev, newDeadline]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      titel: '',
      datum: '',
      label: 'normal',
      notities: ''
    });
    setEditingDeadline(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setFormData({
      titel: deadline.titel,
      datum: deadline.datum,
      label: deadline.label,
      notities: deadline.notities
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeadlines(prev => prev.filter(d => d.id !== id));
  };

  const getLabelColor = (label: Deadline['label']) => {
    switch (label) {
      case 'urgent': return 'urgent';
      case 'important': return 'important';
      case 'normal': return 'normal';
      case 'low': return 'low';
      default: return 'normal';
    }
  };

  const getDaysUntil = (datum: string) => {
    const deadlineDate = parseISO(datum);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} dagen geleden`;
    if (diffDays === 0) return 'Vandaag';
    if (diffDays === 1) return 'Morgen';
    return `Over ${diffDays} dagen`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Aankomende Deadlines</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Alle
              </Button>
              <Button
                variant={filter === '7days' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('7days')}
              >
                7 dagen
              </Button>
              <Button
                variant={filter === '30days' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('30days')}
              >
                30 dagen
              </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nieuwe Deadline
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingDeadline ? 'Deadline Bewerken' : 'Nieuwe Deadline'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Titel</label>
                    <Input
                      value={formData.titel}
                      onChange={(e) => setFormData(prev => ({ ...prev, titel: e.target.value }))}
                      placeholder="Deadline titel..."
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Datum</label>
                    <Input
                      type="date"
                      value={formData.datum}
                      onChange={(e) => setFormData(prev => ({ ...prev, datum: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Prioriteit</label>
                    <select
                      value={formData.label}
                      onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value as Deadline['label'] }))}
                      className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md"
                    >
                      <option value="low">Laag</option>
                      <option value="normal">Normaal</option>
                      <option value="important">Belangrijk</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Notities</label>
                    <Textarea
                      value={formData.notities}
                      onChange={(e) => setFormData(prev => ({ ...prev, notities: e.target.value }))}
                      placeholder="Extra notities..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingDeadline ? 'Bijwerken' : 'Toevoegen'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {filteredDeadlines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Geen deadlines gevonden voor de geselecteerde filter.</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredDeadlines.map((deadline, index) => (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{deadline.titel}</h3>
                      <Badge variant={getLabelColor(deadline.label)}>
                        {deadline.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(parseISO(deadline.datum), 'dd MMM yyyy')}
                      </span>
                      <span className="font-medium">
                        {getDaysUntil(deadline.datum)}
                      </span>
                    </div>
                    {deadline.notities && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {deadline.notities}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(deadline)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(deadline.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};