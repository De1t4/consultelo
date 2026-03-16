'use client';

import React, { useEffect, useRef, useState, createContext, useContext } from 'react';

// Context to allow children components (like ActionMenuItem) to close the menu
const ActionMenuContext = createContext<{ close: () => void } | undefined>(undefined);

export function useActionMenu() {
  const context = useContext(ActionMenuContext);
  if (!context) {
    throw new Error('useActionMenu must be used within an ActionMenu');
  }
  return context;
}

interface ActionMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

/**
 * A highly flexible dropdown menu component.
 * Uses 'trigger' for the toggle element and 'children' for the dropdown content.
 */
export function ActionMenu({ trigger, children, className = "", align = 'right' }: ActionMenuProps) {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setShow(false);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(!show);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  return (
    <ActionMenuContext.Provider value={{ close }}>
      <div className={`relative inline-block ${className}`} ref={containerRef}>
        <div onClick={toggle} className="cursor-pointer inline-flex">
          {trigger}
        </div>

        {show && (
          <div
            onClick={(e) => e.stopPropagation()} // Stop bubbling from the dropdown container
            className={`absolute z-10 mt-2 min-w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-1.5 animate-in fade-in zoom-in duration-200 
              ${align === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {children}
          </div>
        )}
      </div>
    </ActionMenuContext.Provider>
  );
}

interface ActionMenuItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * Standard item for the ActionMenu.
 * Automatically closes the menu when clicked.
 */
export function ActionMenuItem({ children, onClick, className = "" }: ActionMenuItemProps) {
  const { close } = useActionMenu();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop bubbling from the item click
    if (onClick) {
      onClick(e);
    }
    close();
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full cursor-pointer flex items-center px-3 py-2 text-sm hover:bg-accent/90 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
