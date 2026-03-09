"use client"

import { ActionMenu, ActionMenuItem } from '@/components/ui/ActionMenu';
import { Modal } from '@/components/ui/Modal';
import { deleteConsultationAction } from '@/features/consultations';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sileo } from 'sileo';
import EditConsultForm from './form/EditConsultForm';

export default function ConsultationToogle({ consultation }: { consultation: ResponseConsultList }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteConsultation } = useMutation({
    mutationFn: (idConsultation: string) => deleteConsultationAction(idConsultation),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['consultations'] });
        sileo.success({
          title: "Consultation deleted successfully",
          description: "The consultation has been deleted successfully",
        });
        router.refresh();
      } else {
        sileo.error({
          title: "Error deleting consultation",
          description: res.error,
        });
      }
    },
    onError: () => {
      sileo.error({
        title: "System Error",
        description: "An unexpected error occurred while deleting.",
      });
    }
  });

  return (
    <>
      <Modal title='Edit Consultation' isOpen={isOpen} onClose={() => setIsOpen(false)} size='lg'>
        <EditConsultForm consultation={consultation} setIsOpen={setIsOpen} />
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
