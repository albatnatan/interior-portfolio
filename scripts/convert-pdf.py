import fitz  # PyMuPDF
import os

def convert_pdf_to_images(pdf_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # Increase resolution
        output_path = os.path.join(output_folder, f"page_{i+1}.jpg")
        
        # Save first page as cover too
        if i == 0:
            pix.save(os.path.join(output_folder, "cover.jpg"))
            
        pix.save(output_path)
        print(f"Saved: {output_path}")
    
    doc.close()

if __name__ == "__main__":
    pdf_path = r"C:\Users\ayalb\Downloads\PRFinal.pdf"
    output_folder = r"c:\Users\ayalb\Desktop\adan\interior-portfolio\public\projects\PRFinal"
    convert_pdf_to_images(pdf_path, output_folder)
