"use client"

import { ActionMenu, ActionMenuItem } from '@/components/ui/ActionMenu';
import { Modal } from '@/components/ui/Modal';
import { useDeleteConsultation } from '@/features/consultations';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditConsultForm from './form/EditConsultForm';

export default function ConsultationToogle({ consultation }: { consultation: ResponseConsultList }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { deleteConsultation } = useDeleteConsultation();

  const handleDeleteConsultation = () => {
    deleteConsultation(consultation.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['consultations'] });
      }
    })
  }

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
          onClick={() => handleDeleteConsultation()}
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
