use comemo::Prehashed;
use std::sync::OnceLock;
use typst::{
    diag::FileResult,
    doc::Document,
    eval::{Bytes, Datetime, Library, Tracer},
    font::{Font, FontBook},
    syntax::{FileId, Source},
    World,
};
use wasm_bindgen::prelude::wasm_bindgen;

static mut INSTANCE: OnceLock<WasmWorld> = OnceLock::new();

#[wasm_bindgen(start)]
fn start() {
    unsafe {
        INSTANCE.get_or_init(|| {
            let (book, fonts) = start_embedded_fonts();

            WasmWorld {
                library: Prehashed::new(typst_library::build()),
                book: Prehashed::new(book),
                fonts,
                source: Source::detached(""),
            }
        })
    };
}

fn world() -> &'static mut WasmWorld {
    unsafe { INSTANCE.get_mut().unwrap() }
}

#[wasm_bindgen]
pub fn string_bytes(text: &str) -> Vec<u8> {
    let my_bytes: &[u8] = text.as_bytes();
    my_bytes.to_vec()
}

fn compile(text: &str) -> Document {
    let world = world();
    world.source.replace(text.to_owned());
    let mut tracer = Tracer::new();

    typst::compile(world, &mut tracer).unwrap()
}

#[wasm_bindgen]
pub fn compile_svg(text: &str) -> String {
    let document = compile(text);

    typst::export::svg_merged(&document.pages, typst::geom::Abs::pt(5.0))
}

#[wasm_bindgen]
pub fn compile_pdf(text: &str) -> Vec<u8> {
    let document = compile(text);

    typst::export::pdf(&document)
}

fn start_embedded_fonts() -> (FontBook, Vec<Font>) {
    let mut book = FontBook::new();
    let mut fonts = Vec::new();

    let mut process = |bytes: &'static [u8]| {
        let buffer = Bytes::from_static(bytes);
        for font in Font::iter(buffer) {
            book.push(font.info().clone());
            fonts.push(font);
        }
    };

    process(include_bytes!("../assets/fonts/LinBiolinum_R.ttf"));
    process(include_bytes!("../assets/fonts/LinBiolinum_RB.ttf"));
    process(include_bytes!("../assets/fonts/LinBiolinum_RI.ttf"));
    process(include_bytes!("../assets/fonts/Inter-Bold.ttf"));
    process(include_bytes!("../assets/fonts/Inter-Regular.ttf"));
    process(include_bytes!("../assets/fonts/Inter-ExtraBold.ttf"));
    process(include_bytes!("../assets/fonts/NewCMMath-Book.otf"));

    (book, fonts)
}

pub struct WasmWorld {
    library: Prehashed<Library>,
    book: Prehashed<FontBook>,
    fonts: Vec<Font>,
    source: Source,
}

impl World for WasmWorld {
    fn library(&self) -> &Prehashed<Library> {
        &self.library
    }

    fn book(&self) -> &Prehashed<FontBook> {
        &self.book
    }

    fn main(&self) -> Source {
        self.source.clone()
    }

    fn source(&self, _id: FileId) -> FileResult<Source> {
        unimplemented!()
    }

    fn file(&self, _id: FileId) -> FileResult<Bytes> {
        unimplemented!()
    }

    fn font(&self, index: usize) -> Option<Font> {
        Some(self.fonts[index].clone())
    }

    fn today(&self, _offset: Option<i64>) -> Option<Datetime> {
        unimplemented!()
    }
}
