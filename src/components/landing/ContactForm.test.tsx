import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from './ContactForm';

// Mockeo global de la función fetch para que los test no hagan peticiones reales
global.fetch = vi.fn();

describe('ContactForm Component (Integration)', () => {
  it('renders the form fields correctly', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Professional Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
    
    // Debería mostrar los mensajes de error asincrónicamente
    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });

  it('shows success message on successful API submission', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(<ContactForm />);

    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Professional Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello world! Testing the form.' } });

    // Enviar formulario
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Verificamos que el texto de éxito aparezca en pantalla
    expect(await screen.findByText(/Message sent successfully/i)).toBeInTheDocument();
  });
});
