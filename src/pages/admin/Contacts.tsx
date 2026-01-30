import { useState, useEffect } from "react";
import { Mail, Eye, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ is_read: true })
        .eq("id", contactId);

      if (error) throw error;

      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, is_read: true } : c))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to mark as read");
    }
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.is_read) {
      markAsRead(contact.id);
    }
  };

  const handleDelete = async () => {
    if (!deleteContact) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", deleteContact.id);

      if (error) throw error;

      setContacts((prev) => prev.filter((c) => c.id !== deleteContact.id));
      toast.success("Message deleted");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete message");
    } finally {
      setDeleteContact(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Contact form submissions
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl text-foreground">Contacts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {contacts.length} message{contacts.length !== 1 ? "s" : ""}
          {unreadCount > 0 && ` (${unreadCount} unread)`}
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 border border-border">
          <Mail className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No messages yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Contact form submissions will appear here
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="max-w-xs">Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className={!contact.is_read ? "bg-muted/20" : ""}
              >
                <TableCell>
                  {!contact.is_read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate text-sm text-muted-foreground">
                    {contact.message}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(contact.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewContact(contact)}
                      title="View message"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {!contact.is_read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => markAsRead(contact.id)}
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                      onClick={() => setDeleteContact(contact)}
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* View Message Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={() => setSelectedContact(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair">Message</DialogTitle>
            <DialogDescription>
              From {selectedContact?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Name
                  </p>
                  <p>{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Date
                  </p>
                  <p>{formatDate(selectedContact.created_at)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
                  Message
                </p>
                <div className="bg-muted/30 p-4 border border-border text-sm whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" asChild className="gap-2">
                  <a href={`mailto:${selectedContact.email}`}>
                    <Mail className="w-4 h-4" />
                    Reply
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteContact}
        onOpenChange={() => setDeleteContact(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message from{" "}
              {deleteContact?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contacts;
