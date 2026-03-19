// types.d.ts
interface IBook {
  _id: string;
  clerkId: string;
  title: string;
  slug: string;
  author: string;
  persona: string;
  fileUrl: string;
  fileBlobKey: string;
  coverUrl: string;
  coverBlobKey: string;
  fileSize: number;
  totalSegments: number;
  createdAt: string;
  updatedAt: string;
}