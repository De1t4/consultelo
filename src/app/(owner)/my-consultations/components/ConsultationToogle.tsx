import { deleteConsultationAction } from '@/actions/consultation-mutation';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { sileo } from 'sileo';

export default function ConsultationToogle({ consultation }: { consultation: ResponseConsultList }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteConsultation } = useMutation({
    mutationFn: (idConsultation: string) => deleteConsultationAction(idConsultation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
      sileo.success(
        {
          title: "Consultation deleted successfully",
          description: "The consultation has been deleted successfully",
        }
      )
      router.refresh();
    },
    onError: () => {
      sileo.error(
        {
          title: "Error deleting consultation",
          description: "The consultation could not be deleted. Please try again.",
        }
      )
    }
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const onDeleteConsultation = async (e: React.MouseEvent, idConsultation: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(false);
    await deleteConsultation(idConsultation);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in duration-200">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); /* Edit logic */ }}
              className="w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-accent/90 transition-colors"
            >
              <Edit className="h-4 w-4 text-foreground" />
              <span className='text-foreground'>Edit details</span>
            </button>
            <div className="h-px bg-border my-1.5" />
            <button
              onClick={(e) => onDeleteConsultation(e, consultation.id)}
              className="w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:dark:bg-red-950 transition-colors font-medium"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
