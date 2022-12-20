export interface Post {
    _id: string;
    title: string;
    description: string;
    pictureUrl: string;
    hasImage: boolean;
    profile: {
      name: string;
    };
    comments: [];
    likes: string[];
    image: boolean;
  }