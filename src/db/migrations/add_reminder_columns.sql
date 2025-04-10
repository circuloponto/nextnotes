-- Add reminder and due date columns to notes table
ALTER TABLE notes 
ADD COLUMN "dueDate" TIMESTAMP WITH TIME ZONE,
ADD COLUMN "reminderDate" TIMESTAMP WITH TIME ZONE,
ADD COLUMN "reminderTime" TEXT DEFAULT '09:00';
