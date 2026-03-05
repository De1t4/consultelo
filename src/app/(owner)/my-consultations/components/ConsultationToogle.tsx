"use client"

import { deleteConsultationAction } from '@/actions/consultation-mutation';
import { ActionMenu, ActionMenuItem } from '@/components/ui/ActionMenu';
import { Modal } from '@/components/ui/Modal';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Edit, Eye, Lock, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sileo } from 'sileo';
import EditorText from '../../consultation/components/EditorText';
import { Button } from '@/components/ui/Button';

export default function ConsultationToogle({ consultation }: { consultation: ResponseConsultList }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteConsultation } = useMutation({
    mutationFn: (idConsultation: string) => deleteConsultationAction(idConsultation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
      sileo.success({
        title: "Consultation deleted successfully",
        description: "The consultation has been deleted successfully",
      });
      router.refresh();
    },
    onError: () => {
      sileo.error({
        title: "Error deleting consultation",
        description: "The consultation could not be deleted. Please try again.",
      });
    }
  });

  return (
    <>
      <Modal title='Edit Consultation' isOpen={isOpen} onClose={() => setIsOpen(false)} size='lg' >
        <div className="flex flex-col gap-4 my-4">
          <div >
            <label htmlFor='title' className="block text-sm font-medium text-muted-foreground mb-2">Consultation Title</label>
            <input
              type="text"
              name='title'
              id='title'
              defaultValue={consultation.title}
              placeholder='Ej: How to build a website'
              className="w-full px-3 py-2 bg-background border text-wrap border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor='title' className="block text-sm font-medium text-muted-foreground mb-2">Description and Context</label>
            <EditorText body={consultation.body as string} setValue={(value) => console.log(value)} />
          </div>
          <div>
            <label htmlFor='categories' className="block text-sm font-medium text-muted-foreground mb-2">Industry Category</label>
            <select
              id="categories"
              defaultValue={consultation.categories}
              className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
            >
              <option value="">Select Category</option>
              <option value="software">Software</option>
              <option value="IA">IA</option>
              <option value="business">Business</option>
              <option value="company">Company</option>
              <option value="strategy">Strategy</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Advanced Settings
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="rounded-xl border border-border bg-background overflow-hidden divide-y divide-border">

            {/* Private Mode */}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
                  <Lock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Private Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Only invited people can view.</p>
                </div>
              </div>

            </div>

            {/* Identity Visibility */}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
                  <Eye className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Identity Visibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">How others see you.</p>
                </div>
              </div>

            </div>

            {/* Knowledge Sharing */}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Knowledge Sharing</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Allow community to view anonymized responses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border  py-4">
          <Button
            variant='outline'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='primary'
          >
            Save Changes
          </Button>
        </div>
      </Modal>
      <ActionMenu
        trigger={
          <div className="p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20">
            <MoreVertical className="h-4 w-4" />
          </div>
        }
      >
        <ActionMenuItem onClick={() => setIsOpen(true)}>
          <div className="flex items-center gap-2.5">
            <Edit className="h-4 w-4 text-foreground" />
            <span className="text-foreground">Edit details</span>
          </div>
        </ActionMenuItem>



        <div className="h-px bg-border my-1.5" />

        <ActionMenuItem
          onClick={() => deleteConsultation(consultation.id)}
          className="text-red-600 hover:bg-red-50 hover:dark:bg-red-950 font-medium"
        >
          <div className="flex items-center gap-2.5">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </div>
        </ActionMenuItem>
      </ActionMenu>
    </>
  );
}
