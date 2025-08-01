import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Code, Download, Zap, Sparkles, Copy, Check, History, Plus, MessageSquare, Menu, Lock, X } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import './AIChat.css';

const AIChat = () => {
  const { user, login, register } = useAuth();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Welcome to GenMeshAI! I'm your intelligent 3D creation tool. I can help you generate Python scripts for Blender and 3D mesh files. Try asking me to create something like:\n\n• 'Create a simple cube with materials'\n• 'Generate a procedural tree model'\n• 'Make a low-poly character base'\n\nWhat would you like to create today?",
      timestamp: new Date()
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState(() => {
    const saved = localStorage.getItem('genmesh_current_chat_id');
    return saved ? parseInt(saved) : 1;
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Show sidebar by default on desktop, hide on mobile
    return window.innerWidth > 768;
  });
  
  // Authentication and prompt tracking states
  const [promptCount, setPromptCount] = useState(() => {
    const saved = localStorage.getItem('genmesh_prompt_count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyCode = (code, messageId) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(messageId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI responses based on keywords
    let response = {
      content: "",
      code: "",
      downloadLink: null
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('cube')) {
      response.content = "I've created a Blender script that generates a textured cube with materials. This script will create a cube, add a material with a procedural texture, and set up basic lighting.";
      response.code = `import bpy
import bmesh
from mathutils import Vector

# Clear existing mesh objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

# Create a new cube
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))
cube = bpy.context.active_object
cube.name = "AI_Generated_Cube"

# Add material
material = bpy.data.materials.new(name="CubeMaterial")
material.use_nodes = True
cube.data.materials.append(material)

# Get material nodes
nodes = material.node_tree.nodes
links = material.node_tree.links

# Clear default nodes
nodes.clear()

# Add shader nodes
output = nodes.new(type='ShaderNodeOutputMaterial')
principled = nodes.new(type='ShaderNodeBsdfPrincipled')
noise = nodes.new(type='ShaderNodeTexNoise')
colorRamp = nodes.new(type='ShaderNodeValToRGB')

# Set positions
output.location = (400, 0)
principled.location = (200, 0)
colorRamp.location = (0, 0)
noise.location = (-200, 0)

# Configure noise texture
noise.inputs['Scale'].default_value = 5.0
noise.inputs['Detail'].default_value = 15.0

# Configure color ramp
colorRamp.color_ramp.elements[0].color = (0.1, 0.2, 0.8, 1.0)  # Blue
colorRamp.color_ramp.elements[1].color = (0.8, 0.2, 0.1, 1.0)  # Red

# Link nodes
links.new(noise.outputs['Color'], colorRamp.inputs['Fac'])
links.new(colorRamp.outputs['Color'], principled.inputs['Base Color'])
links.new(principled.outputs['BSDF'], output.inputs['Surface'])

# Add some roughness variation
principled.inputs['Roughness'].default_value = 0.3

print("AI Generated Cube with procedural material created successfully!")`;
      response.downloadLink = "cube_generator.py";
    } else if (message.includes('tree')) {
      response.content = "Here's a procedural tree generator script! This creates a tree with branches using Blender's geometry nodes and adds realistic materials.";
      response.code = `import bpy
import bmesh
import random
from mathutils import Vector

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

def create_tree_trunk():
    # Create trunk
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.3, 
        depth=4, 
        location=(0, 0, 2)
    )
    trunk = bpy.context.active_object
    trunk.name = "Tree_Trunk"
    
    # Add trunk material
    trunk_mat = bpy.data.materials.new(name="TrunkMaterial")
    trunk_mat.use_nodes = True
    trunk.data.materials.append(trunk_mat)
    
    nodes = trunk_mat.node_tree.nodes
    nodes.clear()
    
    output = nodes.new('ShaderNodeOutputMaterial')
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    
    # Brown bark color
    principled.inputs['Base Color'].default_value = (0.3, 0.2, 0.1, 1.0)
    principled.inputs['Roughness'].default_value = 0.9
    
    trunk_mat.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return trunk

def create_leaves():
    # Create leaves using icosphere
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=2,
        radius=2.5,
        location=(0, 0, 5)
    )
    leaves = bpy.context.active_object
    leaves.name = "Tree_Leaves"
    
    # Add leaves material
    leaves_mat = bpy.data.materials.new(name="LeavesMaterial")
    leaves_mat.use_nodes = True
    leaves.data.materials.append(leaves_mat)
    
    nodes = leaves_mat.node_tree.nodes
    nodes.clear()
    
    output = nodes.new('ShaderNodeOutputMaterial')
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    
    # Green leaf color
    principled.inputs['Base Color'].default_value = (0.2, 0.6, 0.2, 1.0)
    principled.inputs['Subsurface'].default_value = 0.3
    principled.inputs['Subsurface Color'].default_value = (0.4, 0.8, 0.3, 1.0)
    
    leaves_mat.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return leaves

# Generate tree
trunk = create_tree_trunk()
leaves = create_leaves()

# Add some randomness to leaves shape
bpy.context.view_layer.objects.active = leaves
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.transform.resize(value=(
    random.uniform(0.8, 1.2),
    random.uniform(0.8, 1.2),
    random.uniform(0.9, 1.1)
))
bpy.ops.object.mode_set(mode='OBJECT')

print("Procedural tree generated successfully!")`;
      response.downloadLink = "tree_generator.py";
    } else if (message.includes('character') || message.includes('low-poly')) {
      response.content = "I've created a low-poly character base mesh perfect for game development. This includes the basic humanoid shape with proper topology for rigging.";
      response.code = `import bpy
import bmesh
from mathutils import Vector

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

def create_character_base():
    # Create new mesh and object
    mesh = bpy.data.meshes.new("CharacterBase")
    obj = bpy.data.objects.new("LowPolyCharacter", mesh)
    bpy.context.collection.objects.link(obj)
    
    # Create bmesh instance
    bm = bmesh.new()
    
    # Create basic character shape using bmesh
    # Head
    bmesh.ops.create_uvsphere(bm, u_segments=8, v_segments=6, radius=0.8, 
                             location=(0, 0, 7))
    
    # Torso
    bmesh.ops.create_cube(bm, size=2, location=(0, 0, 4))
    # Scale torso
    bmesh.ops.scale(bm, vec=(1.2, 0.8, 2), verts=[v for v in bm.verts if v.co.z < 5.5 and v.co.z > 2.5])
    
    # Arms
    bmesh.ops.create_cube(bm, size=1, location=(2, 0, 4.5))
    bmesh.ops.scale(bm, vec=(0.4, 0.4, 1.5), verts=[v for v in bm.verts if v.co.x > 1.5])
    
    bmesh.ops.create_cube(bm, size=1, location=(-2, 0, 4.5))
    bmesh.ops.scale(bm, vec=(0.4, 0.4, 1.5), verts=[v for v in bm.verts if v.co.x < -1.5])
    
    # Legs
    bmesh.ops.create_cube(bm, size=1, location=(0.6, 0, 1))
    bmesh.ops.scale(bm, vec=(0.5, 0.5, 2), verts=[v for v in bm.verts if v.co.x > 0.3 and v.co.z < 2])
    
    bmesh.ops.create_cube(bm, size=1, location=(-0.6, 0, 1))
    bmesh.ops.scale(bm, vec=(0.5, 0.5, 2), verts=[v for v in bm.verts if v.co.x < -0.3 and v.co.z < 2])
    
    # Remove doubles and recalculate normals
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    
    # Update mesh
    bm.to_mesh(mesh)
    bm.free()
    
    # Add material
    mat = bpy.data.materials.new(name="CharacterMaterial")
    mat.use_nodes = True
    obj.data.materials.append(mat)
    
    nodes = mat.node_tree.nodes
    nodes.clear()
    
    output = nodes.new('ShaderNodeOutputMaterial')
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    
    # Skin-like color
    principled.inputs['Base Color'].default_value = (0.9, 0.7, 0.6, 1.0)
    principled.inputs['Roughness'].default_value = 0.4
    principled.inputs['Subsurface'].default_value = 0.1
    
    mat.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return obj

# Create character
character = create_character_base()
bpy.context.view_layer.objects.active = character

# Add subdivision surface modifier for smoother look
modifier = character.modifiers.new(name="Subdivision", type='SUBSURF')
modifier.levels = 1

print("Low-poly character base created successfully!")`;
      response.downloadLink = "character_base.py";
    } else {
      response.content = "I can help you create various 3D models and Blender scripts! Here are some examples of what I can generate:\n\n🎲 **3D Models**: Cubes, spheres, trees, characters, buildings\n🎨 **Materials**: Procedural textures, PBR materials, animated shaders\n🔧 **Tools**: Custom Blender operators, automation scripts\n🎮 **Game Assets**: Low-poly models, optimized meshes\n\nTry being more specific about what you'd like to create, and I'll generate the Python code for you!";
    }

    setIsTyping(false);
    
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      content: response.content,
      code: response.code,
      downloadLink: response.downloadLink,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  // Authentication functions
  const checkAuthRequired = () => {
    // If user is already authenticated, no need to check
    if (user) return false;
    
    // Check if prompt count exceeds limit
    return promptCount >= 3;
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setAuthMessage({ type: 'success', text: 'Authentication successful!' });
    // Reset form
    setAuthForm({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMessage({ type: '', text: '' });

    try {
      if (authMode === 'login') {
        const result = await login(authForm.email, authForm.password);
        if (result.success) {
          handleAuthSuccess();
        } else {
          setAuthMessage({ type: 'error', text: result.error });
        }
      } else {
        // Registration mode
        if (authForm.password !== authForm.confirmPassword) {
          setAuthMessage({ type: 'error', text: 'Passwords do not match' });
          setAuthLoading(false);
          return;
        }
        
        if (authForm.password.length < 6) {
          setAuthMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
          setAuthLoading(false);
          return;
        }

        const result = await register(authForm.email, authForm.password);
        if (result.success) {
          handleAuthSuccess();
        } else {
          setAuthMessage({ type: 'error', text: result.error });
        }
      }
    } catch (error) {
      setAuthMessage({ type: 'error', text: 'Authentication failed. Please try again.' });
    }

    setAuthLoading(false);
  };

  const handleAuthInputChange = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if authentication is required
    if (checkAuthRequired()) {
      setShowAuthModal(true);
      return;
    }

    // Increment prompt count for non-authenticated users
    if (!user) {
      const newCount = promptCount + 1;
      setPromptCount(newCount);
      localStorage.setItem('genmesh_prompt_count', newCount.toString());
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    
    await generateResponse(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const downloadCode = (code, filename) => {
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Persistent chat history functions
  const saveChatHistory = useCallback((chatId, messages) => {
    const allChats = JSON.parse(localStorage.getItem('genmesh_chat_history') || '{}');
    allChats[chatId] = {
      id: chatId,
      messages: messages,
      lastUpdate: new Date().toISOString(),
      title: messages.length > 0 ? messages[0].text?.substring(0, 30) + '...' || 'New Chat' : 'New Chat'
    };
    localStorage.setItem('genmesh_chat_history', JSON.stringify(allChats));
  }, []);

  const loadStoredChatHistory = useCallback((chatId) => {
    const allChats = JSON.parse(localStorage.getItem('genmesh_chat_history') || '{}');
    return allChats[chatId]?.messages || [];
  }, []);

  const createNewChat = () => {
    // Save current chat if it has messages  
    if (messages.length > 1) {
      saveChatHistory(currentChatId, messages);
    }
    
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Welcome to GenMeshAI! I'm your intelligent 3D creation tool. What would you like to create today?",
      timestamp: new Date()
    }]);
    localStorage.setItem('genmesh_current_chat_id', newChatId.toString());
  };

  const switchToChat = (chatId) => {
    // Save current chat before switching
    if (messages.length > 1) {
      saveChatHistory(currentChatId, messages);
    }
    
    setCurrentChatId(chatId);
    const storedMessages = loadStoredChatHistory(chatId);
    setMessages(storedMessages.length > 0 ? storedMessages : [{
      id: 1,
      type: 'bot',
      content: "Welcome to GenMeshAI! I'm your intelligent 3D creation tool. What would you like to create today?",
      timestamp: new Date()
    }]);
    localStorage.setItem('genmesh_current_chat_id', chatId.toString());
    
    // Close sidebar on mobile after switching
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const getAllStoredChats = () => {
    const allChats = JSON.parse(localStorage.getItem('genmesh_chat_history') || '{}');
    return Object.values(allChats).sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
  };

  // Auto-save current chat when messages change
  useEffect(() => {
    if (messages.length > 1) {
      saveChatHistory(currentChatId, messages);
    }
  }, [messages, currentChatId, saveChatHistory]);

  return (
    <>
      <Helmet>
        <title>GenMeshAI - GenMesh Studio</title>
        <meta name="description" content="Professional AI-powered 3D creation tool to generate Blender scripts and mesh files instantly" />
      </Helmet>

      <div className="genmesh-ai-page">
        {/* Sidebar */}
        <div 
          className={`chat-sidebar ${!isSidebarOpen ? 'mobile-hidden' : ''}`}
        >
          <div className="sidebar-header">
            <button 
              className="new-chat-btn"
              onClick={createNewChat}
            >
              <Plus size={18} />
              <span>New Chat</span>
            </button>
          </div>
          
          <div className="chat-history">
            <div className="history-section">
              <h3>
                <History size={16} />
                Recent Chats
              </h3>
              <div className="history-list">
                {getAllStoredChats().map((chat) => (
                  <button
                    key={chat.id}
                    className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
                    onClick={() => switchToChat(chat.id)}
                  >
                    <MessageSquare size={16} />
                    <div className="history-content">
                      <span className="history-title">{chat.title}</span>
                      <span className="history-time">
                        {new Date(chat.lastUpdate).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {/* Compact Header */}
          <div className="chat-top-bar">
            <button 
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </button>
            
            <div className="top-bar-content">
              <div className="ai-title">
                <Bot size={20} />
                <span>GenMeshAI</span>
              </div>
              
              <div className="feature-pills">
                <div className="feature-pill">
                  <Code size={14} />
                  <span>Python</span>
                </div>
                <div className="feature-pill">
                  <Zap size={14} />
                  <span>Instant</span>
                </div>
                <div className="feature-pill">
                  <Download size={14} />
                  <span>Download</span>
                </div>
                {!user && (
                  <div className={`feature-pill prompt-counter ${promptCount >= 3 ? 'limit-reached' : ''}`}>
                    <MessageSquare size={14} />
                    <span>{Math.max(0, 3 - promptCount)} prompts left</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages-container">
            <div className="chat-messages">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`message ${message.type}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="message-avatar">
                      {message.type === 'bot' ? (
                        <Bot size={18} />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                    <div className="message-content">
                      <p>{message.content}</p>
                      
                      {message.code && (
                        <motion.div 
                          className="code-block"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="code-header">
                            <span className="code-language">Python (Blender)</span>
                            <div className="code-actions">
                              <button
                                onClick={() => handleCopyCode(message.code, message.id)}
                                className="copy-btn"
                              >
                                {copiedCode === message.id ? (
                                  <Check size={14} />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                              {message.downloadLink && (
                                <button
                                  onClick={() => downloadCode(message.code, message.downloadLink)}
                                  className="download-btn"
                                >
                                  <Download size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                          <pre><code>{message.code}</code></pre>
                        </motion.div>
                      )}
                      
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  className="message bot typing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <Bot size={18} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p>GenMeshAI is processing your request...</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <motion.div 
            className="chat-input-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="input-container">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you want to create... (e.g., 'Create a textured cube' or 'Generate a low-poly tree')"
                className="chat-input"
                rows="1"
                disabled={isTyping}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
            
            <div className="input-suggestions">
              <button 
                onClick={() => setInputValue("Create a simple cube with materials")}
                className="suggestion-chip"
              >
                <Sparkles size={12} />
                Simple Cube
              </button>
              <button 
                onClick={() => setInputValue("Generate a procedural tree model")}
                className="suggestion-chip"
              >
                <Sparkles size={12} />
                Tree Model
              </button>
              <button 
                onClick={() => setInputValue("Make a low-poly character base")}
                className="suggestion-chip"
              >
                <Sparkles size={12} />
                Character Base
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {/* Authentication Modal */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              className="auth-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowAuthModal(false);
                }
              }}
            >
              <motion.div
                className="auth-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="auth-modal-header">
                  <div className="auth-header-content">
                    <Lock size={24} />
                    <div>
                      <h2>Continue with GenMeshAI</h2>
                      <p>You've used 3 free prompts. Sign in to continue creating amazing 3D content!</p>
                    </div>
                  </div>
                  <button
                    className="auth-modal-close"
                    onClick={() => setShowAuthModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="auth-modal-content">
                  <div className="auth-tabs">
                    <button
                      className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                      onClick={() => setAuthMode('login')}
                    >
                      Sign In
                    </button>
                    <button
                      className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
                      onClick={() => setAuthMode('register')}
                    >
                      Sign Up
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="auth-form">
                    <div className="form-group">
                      <label htmlFor="auth-email">Email</label>
                      <input
                        type="email"
                        id="auth-email"
                        name="email"
                        value={authForm.email}
                        onChange={handleAuthInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="auth-password">Password</label>
                      <input
                        type="password"
                        id="auth-password"
                        name="password"
                        value={authForm.password}
                        onChange={handleAuthInputChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {authMode === 'register' && (
                      <div className="form-group">
                        <label htmlFor="auth-confirm-password">Confirm Password</label>
                        <input
                          type="password"
                          id="auth-confirm-password"
                          name="confirmPassword"
                          value={authForm.confirmPassword}
                          onChange={handleAuthInputChange}
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                    )}

                    {authMessage.text && (
                      <div className={`auth-message ${authMessage.type}`}>
                        {authMessage.text}
                      </div>
                    )}

                    <button
                      type="submit"
                      className={`auth-submit-btn ${authLoading ? 'loading' : ''}`}
                      disabled={authLoading}
                    >
                      {authLoading ? (
                        <span>Processing...</span>
                      ) : (
                        <span>{authMode === 'login' ? 'Sign In' : 'Sign Up'}</span>
                      )}
                    </button>
                  </form>

                  <div className="auth-footer">
                    <p>
                      {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        className="auth-switch-btn"
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      >
                        {authMode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AIChat;
