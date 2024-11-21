import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { FiPlus, FiSearch } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { ButtonText } from "../../components/ButtonText";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function Home() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleSelectedTags(tagName) {
        if(tagName === "all") {
            return setSelectedTags([]);
        }

        const alreadySelected = selectedTags.includes(tagName);
        
        if(alreadySelected) {
            const filteredTags = selectedTags.filter(tag => tag !== tagName);
            setSelectedTags(filteredTags);
        }
        else {
            setSelectedTags(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [selectedTags, search]);

    return (
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText
                        title="Todas"
                        onClick={() => handleSelectedTags("all")}
                        isActive={selectedTags.length === 0}
                    /> 
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                title={tag.name}
                                onClick={() => handleSelectedTags(tag.name)}
                                isActive={selectedTags.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input
                    placeholder="Pesquisar pelo título"
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title={"Minhas Notas"}>
                    {
                        notes && notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota
            </NewNote>
        </Container>
    );
}