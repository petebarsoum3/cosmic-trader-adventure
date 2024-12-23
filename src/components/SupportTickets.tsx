import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquarePlus, Ticket } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
}

export function SupportTickets() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("support_tickets");
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!title || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem("support_tickets", JSON.stringify(updatedTickets));

    toast({
      title: "Ticket created",
      description: "Your support ticket has been submitted successfully.",
    });

    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleCloseTicket = (id: string) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: "closed" as const } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem("support_tickets", JSON.stringify(updatedTickets));

    toast({
      title: "Ticket closed",
      description: "Your support ticket has been closed.",
    });
  };

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Ticket className="w-6 h-6 text-cyber-primary" />
          Support Tickets
        </h2>
        <Button onClick={() => setIsOpen(true)} className="cyber-button">
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll help you resolve it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cyber-input"
            />
            <Textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cyber-input min-h-[100px]"
            />
            <Button onClick={handleSubmit} className="w-full cyber-button">
              Submit Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <p className="text-center text-muted-foreground">No tickets yet</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-lg border border-white/10 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ticket.status === "open" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                  }`}>
                    {ticket.status}
                  </span>
                  {ticket.status === "open" && (
                    <Button
                      onClick={() => handleCloseTicket(ticket.id)}
                      variant="secondary"
                      size="sm"
                    >
                      Close
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm">{ticket.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}