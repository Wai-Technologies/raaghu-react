export interface Comment {
  firstName: string;
  lastName: string;
  comment: string;
  image?: string;
  video?: string;
}

export const startCamera = async (videoRef: React.RefObject<HTMLVideoElement>) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    return stream;
  } catch (error) {
  }
};

export const stopCamera = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const stream = videoRef.current?.srcObject as MediaStream;
  stream?.getTracks().forEach(track => track.stop());
};

export const capturePhoto = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  addComment: (comment: Comment) => void,
  currentUser: { firstName: string; lastName: string },
  updateState: (updates: any) => void,
  stopCameraFn: () => void
) => {
  if (canvasRef.current && videoRef.current) {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    addComment({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      comment: "",
      image: canvasRef.current.toDataURL("image/png"),
    });
    updateState({ showCamera: false });
    stopCameraFn();
  }
};

export function updateState(setState: any) {
  return (updates: any) => setState((prev: any) => ({ ...prev, ...updates }));
}

export function onUserSelect(index: number, props: any, setCurrentUser: any, updateStateFn: any) {
  if (index >= 0 && index < props.userData.length) {
    setCurrentUser(props.userData[index]);
    updateStateFn({
      commentList: props.userData[index].comments || [],
      selectedIndex: index,
    });
  }
}

export function addComment(newComment: Comment, state: any, updateStateFn: any, handleAddComment: any) {
  const updatedComments = [...state.commentList, newComment];
  updateStateFn({ commentList: updatedComments });
  handleAddComment?.(newComment);
}

export function handleAddComment(state: any, currentUser: any, addCommentFn: any, updateStateFn: any) {
  if (state.commentText.trim()) {
    addCommentFn({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      comment: state.commentText,
    });
    updateStateFn({ commentText: "" });
  }
}

export function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>, currentUser: any, addCommentFn: any) {
  const file = event.target.files?.[0];
  if (file?.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onloadend = () => {
      addCommentFn({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        comment: "",
        image: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }
}
