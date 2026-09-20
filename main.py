import os
import json
import re
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

# Tải biến môi trường từ .env
load_dotenv()

app = FastAPI(
    title="Kindergarten Poem & Media Search API",
    description="Hệ thống tra cứu bài thơ mầm non trực tuyến sử dụng Gemini API và Google Search Grounding",
    version="1.0.0"
)

# Cấu hình CORS để frontend gọi API thông suốt
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Schemas
class PoemSearchRequest(BaseModel):
    query: str
    apiKey: Optional[str] = None

class PoemResponse(BaseModel):
    title: str
    author: str
    content: str
    category: str
    coverImage: Optional[str] = None
    youtubeUrl: Optional[str] = None
    youtubeTitle: Optional[str] = None
    sources: Optional[List[str]] = []
    isAiGenerated: bool = True

class ApiKeyUpdateRequest(BaseModel):
    apiKey: str

# Local Fallback Database
LOCAL_POEMS = [
    {
        "title": "Ngôi Nhà",
        "author": "Mai Ngọc Thể",
        "category": "Gia đình",
        "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=F0f18y4Jt9I",
        "youtubeTitle": "Nhạc: Nhà Của Tôi",
        "content": "Em yêu nhà em\nHàng xoan trước ngõ\nHoa xao xuyến nở\nNhư mây từng chùm.\n\nEm yêu tiếng chim\nĐầu hồi lảnh lót\nMái vàng thơm phức\nRạ đầy sân phơi.\n\nEm yêu ngôi nhà\nGỗ xoan thơm phức\nCó bạn hoa cúc\nCười trong nắng vàng."
    },
    {
        "title": "Đàn Gà Con",
        "author": "Phạm Hổ",
        "category": "Động vật",
        "coverImage": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=nQJzW-p904g",
        "youtubeTitle": "Nhạc: Đàn Gà Con",
        "content": "Mười quả trứng tròn\nMẹ gà ấp ủ\nHôm nay ra lò\nMười chú gà con.\n\nLông trắng viền vàng\nMắt đen sáng ngời\nCái mỏ tí hon\nCái chân bé xíu.\n\nLíu ríu líu ríu\nTheo mẹ tìm mồi\nGà con vui sướng\nChạy nhảy lon ton."
    },
    {
        "title": "Bắp Cải Xanh",
        "author": "Phạm Hổ",
        "category": "Thực vật",
        "coverImage": "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=Q5vV0lXv2t4",
        "youtubeTitle": "Nhạc: Bắp Cải Xanh",
        "content": "Bắp cải xanh\nXanh man mát\nLá cải sắp\nSắp vòng tròn.\n\nBúp cải non\nNằm ngủ giữa\nBắp cải xanh\nNấu canh ngon!"
    },
    {
        "title": "Yêu Mẹ",
        "author": "Nguyễn Bao",
        "category": "Gia đình",
        "coverImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=lUfWl9m5LhE",
        "youtubeTitle": "Nhạc: Mẹ Yêu Không Nào",
        "content": "Mẹ đi làm\nTừ sáng sớm\nDậy thổi cơm\nKho thịt cá.\n\nEm liền thức\nChạy đến bên\nÔm cổ mẹ\nHôn đôi má."
    },
    {
        "title": "Cây Dây Leo",
        "author": "Xuân Quỳnh",
        "category": "Thực vật",
        "coverImage": "https://images.unsplash.com/photo-1530968464175-e7b97c0e038d?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=48n9R3f7Z7s",
        "youtubeTitle": "Nhạc: Em Yêu Cây Xanh",
        "content": "Cây dây leo\nBé tí teo\nỞ trong nhà\nLại bò ra\nNgoài cửa sổ.\n\nVươn cổ lên\nNgắm trời cao\nHỏi vì sao:\nCây trả lời\nRa ngoài trời\nCho dễ thở\nTắm nắng gió\nGội mưa rào\nCây mới cao\nHoa mới đẹp!"
    },
    {
        "title": "Rong Và Cá",
        "author": "Phạm Hổ",
        "category": "Động vật",
        "coverImage": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=Kz6lE3zW2rU",
        "youtubeTitle": "Nhạc: Cá Vàng Bơi",
        "content": "Có cô rong xanh\nĐẹp như tơ nhuộm\nGiữa hồ nước trong\nNhẹ nhàng uốn lượn.\n\nMột đàn cá nhỏ\nĐuôi đỏ lụa hồng\nQuanh cô rong xanh\nMúa làm văn nghệ."
    },
    {
        "title": "Đi Dép",
        "author": "Phạm Hổ",
        "category": "Bản thân",
        "coverImage": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=e_k9_YjF1U0",
        "youtubeTitle": "Nhạc: Bé Tập Đi Dép",
        "content": "Chân được đi dép\nThấy êm êm là\nDép cũng vui lắm\nĐược đi khắp nhà.\n\nDép cùng với bé\nBảo vệ đôi chân\nĐể chân trắng trẻo\nKhông dính bụi bẩn."
    },
    {
        "title": "Bé Ăn Quả",
        "author": "Sưu tầm",
        "category": "Thực vật",
        "coverImage": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
        "youtubeUrl": "https://www.youtube.com/watch?v=n7z5c2v6KzE",
        "youtubeTitle": "Nhạc: Quả Gì",
        "content": "Bé ăn nhiều quả\nNgười mau lớn mau\nQuả cam quả bưởi\nNhiều vitamin.\n\nBé ăn quả nho\nBé ăn quả táo\nMôi hồng má đỏ\nKhỏe mạnh thông minh."
    }
]

def remove_vietnamese_accents(text: str) -> str:
    """Loại bỏ 100% dấu tiếng Việt và chuẩn hóa khoảng trắng để tìm kiếm không dấu mềm dẻo"""
    if not text:
        return ""
    text = text.lower()
    mapping = {
        'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
        'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
        'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
        'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
        'đ': 'd'
    }
    for k, v in mapping.items():
        text = text.replace(k, v)
    return re.sub(r'\s+', ' ', text).strip()

def search_local_poems(query: str) -> Optional[dict]:
    q_norm = remove_vietnamese_accents(query)
    q_raw = query.lower().strip()
    
    for p in LOCAL_POEMS:
        title_norm = remove_vietnamese_accents(p["title"])
        content_norm = remove_vietnamese_accents(p["content"])
        author_norm = remove_vietnamese_accents(p["author"])
        
        # So khớp
        if (q_raw in p["title"].lower() or q_raw in p["content"].lower() or q_raw in p["author"].lower() or
            q_norm in title_norm or q_norm in content_norm or q_norm in author_norm):
            return {
                **p,
                "sources": ["Cơ sở dữ liệu thơ mầm non"],
                "isAiGenerated": False
            }
    return None

def clean_json_string(text: str) -> str:
    """Loại bỏ markdown ```json ... ``` và trích xuất JSON thuần"""
    if not text:
        return ""
    text = text.strip()
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if match:
        return match.group(1).strip()
    # Tìm khối JSON bắt đầu bằng { và kết thúc bằng }
    brace_match = re.search(r"(\{[\s\S]*\})", text)
    if brace_match:
        return brace_match.group(1).strip()
    return text

@app.get("/api/health")
async def health_check():
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    return {
        "status": "online",
        "geminiConfigured": bool(api_key and api_key != "your_gemini_api_key_here")
    }

@app.post("/api/config/api-key")
async def update_api_key(req: ApiKeyUpdateRequest):
    key = req.apiKey.strip()
    os.environ["GEMINI_API_KEY"] = key
    
    # Ghi vào file .env để lưu vĩnh viễn
    try:
        env_path = os.path.join(os.path.dirname(__file__), ".env")
        lines = []
        key_found = False
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip().startswith("GEMINI_API_KEY="):
                        lines.append(f"GEMINI_API_KEY={key}\n")
                        key_found = True
                    else:
                        lines.append(line)
        if not key_found:
            lines.insert(0, f"GEMINI_API_KEY={key}\n")
        with open(env_path, "w", encoding="utf-8") as f:
            f.writelines(lines)
    except Exception as e:
        print(f"Warning: Could not save to .env: {e}")

    return {"status": "success", "message": "Đã lưu Gemini API Key thành công"}

@app.post("/api/test-api-key")
async def test_api_key(req: ApiKeyUpdateRequest):
    key = req.apiKey.strip() or os.getenv("GEMINI_API_KEY", "").strip()
    if not key:
        raise HTTPException(status_code=400, detail="Vui lòng nhập API Key để kiểm tra.")
    
    import httpx
    # Cách 1: Gọi endpoint models để lấy danh sách model chính xác được hỗ trợ bởi key
    models_url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(models_url)
            if resp.status_code == 200:
                data = resp.json()
                models_list = data.get("models", [])
                supported = [
                    m.get("name", "").replace("models/", "")
                    for m in models_list
                    if "generateContent" in m.get("supportedGenerationMethods", [])
                ]
                
                # Tìm model tối ưu nhất
                preferred = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.7-flash"]
                chosen_model = next((m for m in preferred if m in supported), supported[0] if supported else "gemini-2.5-flash")
                
                return {
                    "status": "success",
                    "message": f"API Key hợp lệ và hoạt động tốt! (Đã kết nối model: {chosen_model})"
                }
            else:
                err_json = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
                err_msg = err_json.get("error", {}).get("message", resp.text)
                raise HTTPException(status_code=400, detail=f"Google API Key không hợp lệ: {err_msg}")
    except HTTPException:
        raise
    except Exception as e:
        # Fallback thử gửi nội dung trực tiếp
        pass

    candidate_models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.7-flash"]
    last_error = "Không thể kết nối tới Google"

    for model_name in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={key}"
        payload = {
            "contents": [{"parts": [{"text": "Xin chao! Hay phan hoi 'OK'."}]}]
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    return {"status": "success", "message": f"API Key hợp lệ và hoạt động tốt! (Model: {model_name})"}
                else:
                    err_json = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
                    last_error = err_json.get("error", {}).get("message", resp.text)
        except Exception as e:
            last_error = str(e)

    raise HTTPException(status_code=400, detail=f"Lỗi từ Google API: {last_error}")

async def call_gemini_rest(api_key: str, prompt: str) -> Optional[str]:
    """Gọi trực tiếp Google Gemini REST API qua httpx, hỗ trợ nhiều model ổn định"""
    import httpx
    candidate_models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.7-flash"]
    
    for model_name in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.2,
                "topP": 0.8,
                "topK": 40,
                "responseMimeType": "application/json"
            }
        }
        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        parts = candidates[0]["content"].get("parts", [])
                        if parts and "text" in parts[0]:
                            return parts[0]["text"]
                elif resp.status_code in [400, 403]:
                    err_json = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
                    err_msg = err_json.get("error", {}).get("message", resp.text)
                    print(f"Model {model_name} error {resp.status_code}: {err_msg}")
        except Exception as e:
            print(f"Model {model_name} failed: {e}")
            continue
    return None

@app.post("/api/search-poem", response_model=PoemResponse)
async def search_poem_online(req: PoemSearchRequest):
    query = req.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Vui lòng nhập tên bài thơ hoặc câu thơ cần tìm.")

    api_key = (req.apiKey or os.getenv("GEMINI_API_KEY", "")).strip()

    # Nếu không có API Key, thử tìm trong local database trước
    if not api_key or api_key == "your_gemini_api_key_here":
        local_match = search_local_poems(query)
        if local_match:
            return local_match
        raise HTTPException(
            status_code=400,
            detail="Chưa cấu hình GEMINI_API_KEY. Vui lòng bấm 'Cài đặt API Key' trên thanh công cụ để nhập API Key và kích hoạt tìm kiếm AI."
        )

    prompt = f"""
Bạn là chuyên gia về văn học thiếu nhi và giáo dục mầm non Việt Nam.
Nhiệm vụ: Tra cứu chính xác bài thơ mầm non theo yêu cầu tìm kiếm: "{query}".
Lưu ý quan trọng:
1. Yêu cầu tìm kiếm có thể là: Tên bài thơ, một hoặc nhiều câu thơ bất kỳ, từ khóa không dấu, hoặc từ khóa gõ sai chính tả. Hãy nhận diện đúng bài thơ mầm non tương ứng.
2. Trả về đúng và đủ toàn văn các khổ thơ (không bị cắt bớt), ngắt dòng chuẩn xác theo từng câu thơ và cách khổ bằng 1 dòng trống.
3. Ghi rõ tên tác giả (nếu không rõ ghi 'Sưu tầm').
4. Gợi ý 1 bài hát thiếu nhi liên quan (kèm tiêu đề).

Định dạng phản hồi BẮT BUỘC là JSON duy nhất (không thêm lời dẫn hay giải thích nào khác) theo cấu trúc sau:
{{
  "title": "Tên bài thơ viết hoa chuẩn (VD: Ngôi Nhà)",
  "author": "Tên tác giả (VD: Mai Ngọc Thể)",
  "content": "Toàn văn bài thơ có phân dòng...",
  "category": "Chủ đề (VD: Gia đình / Động vật / Thực vật / Bé và cô / Giao thông...)",
  "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  "youtubeUrl": "https://www.youtube.com/results?search_query=nhac+thieu+nhi",
  "youtubeTitle": "Nhạc: [Tên bài hát liên quan]",
  "sources": ["Văn học mầm non Việt Nam"]
}}
"""

    response_text = None
    try:
        # Gọi trực tiếp REST API (nhanh & ổn định nhất)
        response_text = await call_gemini_rest(api_key, prompt)
    except HTTPException:
        raise
    except Exception as e:
        print(f"REST call failed: {e}")

    # Nếu REST chưa có kết quả, thử qua SDK genai
    if not response_text:
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            for m_name in ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-pro"]:
                try:
                    model = genai.GenerativeModel(m_name)
                    res = model.generate_content(prompt)
                    if res and res.text:
                        response_text = res.text
                        break
                except Exception:
                    continue
        except Exception as e:
            print(f"GenAI SDK failed: {e}")

    if not response_text:
        local_match = search_local_poems(query)
        if local_match:
            return local_match
        raise HTTPException(status_code=500, detail="Không thể kết nối hoặc lấy dữ liệu từ Google Gemini AI. Vui lòng kiểm tra lại API Key hoặc đường truyền mạng.")

    try:
        cleaned_json = clean_json_string(response_text)
        try:
            data = json.loads(cleaned_json)
        except Exception:
            # Sửa lỗi unescaped newlines
            sanitized = re.sub(r'"([^"\\]*(?:\\.[^"\\]*)*)"', lambda m: '"' + m.group(1).replace('\n', '\\n').replace('\r', '') + '"', cleaned_json)
            data = json.loads(sanitized)

        return PoemResponse(
            title=data.get("title", query.title()),
            author=data.get("author", "Sưu tầm"),
            content=data.get("content", "").replace('\\n', '\n'),
            category=data.get("category", "Mầm non"),
            coverImage=data.get("coverImage") or "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
            youtubeUrl=data.get("youtubeUrl") or f"https://www.youtube.com/results?search_query={data.get('title', query)}",
            youtubeTitle=data.get("youtubeTitle") or f"Nhạc: {data.get('title', query)}",
            sources=data.get("sources", ["Gemini AI"]),
            isAiGenerated=True
        )
    except Exception as e:
        # Thử trích xuất thủ công bằng Regex
        t_m = re.search(r'"(?:title|ten_bai_tho)"\s*:\s*"([^"]+)"', response_text, re.IGNORECASE)
        a_m = re.search(r'"(?:author|tac_gia)"\s*:\s*"([^"]+)"', response_text, re.IGNORECASE)
        c_m = re.search(r'"(?:content|noi_dung)"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"\w+"|\s*})', response_text, re.IGNORECASE)
        
        if t_m or c_m:
            return PoemResponse(
                title=t_m.group(1) if t_m else query.title(),
                author=a_m.group(1) if a_m else "Sưu tầm",
                content=(c_m.group(1) if c_m else response_text).replace('\\n', '\n').strip(),
                category="Mầm non",
                coverImage="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
                youtubeUrl=f"https://www.youtube.com/results?search_query={t_m.group(1) if t_m else query}",
                youtubeTitle=f"Nhạc: {t_m.group(1) if t_m else query}",
                sources=["Gemini AI (Regex Extracted)"],
                isAiGenerated=True
            )

        local_match = search_local_poems(query)
        if local_match:
            return local_match
        raise HTTPException(status_code=500, detail=f"Không thể phân tích dữ liệu AI trả về: {str(e)}")

# Mount Static Files & Routes
if os.path.exists("css"):
    app.mount("/css", StaticFiles(directory="css"), name="css")
if os.path.exists("js"):
    app.mount("/js", StaticFiles(directory="js"), name="js")

@app.get("/")
async def serve_index():
    return FileResponse("index.html")

@app.get("/reader.html")
async def serve_reader():
    return FileResponse("reader.html")

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    print(f"Khoi chay Kindergarten Poem Search Server tai: http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)
