import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompBlogPostNew, { RdsCompBlogPostNewProps } from "../src/rds-comp-blog-post-new/rds-comp-blog-post-new";

describe("RdsCompBlogPostNew", () => {
    const mockProps: RdsCompBlogPostNewProps = {
        blogPostData: {
            file: null,
            title: "",
            blog: "",
            slug: "",
            concurrentMode: "",
            description: "",
            tag: "",
        },
        onPublish: jest.fn(), // Make sure onPublish is a function
        isEdit: false,
    };
    

    beforeEach(() => {
        render(<RdsCompBlogPostNew {...mockProps} />);
    });
    

    it("should render the component", () => {
        expect(screen.getByText("CmsKit.CoverImage")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.BlogId")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.Title")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.Slug")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.ShortDescription")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.Tags")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.SaveAsDraft")).toBeInTheDocument();
        expect(screen.getByText("CmsKit.Publish")).toBeInTheDocument();
    });

    it("should update the title field", () => {
        const titleInput = screen.getByTestId("title") as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: "Test Title" } });

        expect(titleInput.value).toBe("Test Title");
    });

    it("should update the slug field", () => {
        const slugInput = screen.getByTestId("slug") as HTMLInputElement;  // Use getByTestId with a unique ID
        fireEvent.input(slugInput, { target: { value: "test-slug" } });  // Use fireEvent.input for non-input elements
        expect(slugInput.value).toBe("test-slug");
    });
    
    it("should update the concurrency stamp field", () => {
        render(<RdsCompBlogPostNew {...mockProps} isEdit={true} />);
        const concurrencyInput = screen.getByTestId("concurrency-stamp") as HTMLInputElement;
        fireEvent.change(concurrencyInput, { target: { value: "Test description" } });

        expect(concurrencyInput.value).toBe("Test description");
    });

    it("should update the tag field", () => {
        const tagInput = screen.getByTestId("tag") as HTMLInputElement;
        fireEvent.input(tagInput, { target: { value: "test-tag" } });
    
        expect(tagInput.value).toBe("test-tag");
    });
    

    it("should call onPublish when Publish button is clicked", () => {
        const publishButton = screen.getByText("CmsKit.Publish");
        fireEvent.click(publishButton);
        
        expect(mockProps.onPublish).toHaveBeenCalled();
        expect(mockProps.onPublish).toHaveBeenCalledWith(mockProps.blogPostData);
    }); 
    
});
