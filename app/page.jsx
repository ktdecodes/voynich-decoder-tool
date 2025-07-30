import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Decoder() {
  const [inputText, setInputText] = useState("");
  const [domain, setDomain] = useState("herbal");
  const [results, setResults] = useState(null);

  const handleDecode = async () => {
    const res = await fetch("/api/decode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: inputText, domain }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Voynich Decoder</h1>

      <div className="space-y-2">
        <Textarea
          placeholder="Enter a word, line, or EVA transcription (e.g. follo olom flm lan nao ela)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Tabs value={domain} onValueChange={setDomain}>
          <TabsList>
            <TabsTrigger value="herbal">Herbal</TabsTrigger>
            <TabsTrigger value="ritual">Ritual</TabsTrigger>
            <TabsTrigger value="astrology">Astrology</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button onClick={handleDecode}>Decode</Button>
      </div>

      {results && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-2">Step 1: EVA Transcription</h2>
              <p>{results.transcription}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-2">Step 2: Phonetic Form (Simplified Encoding)</h2>
              <p>{results.phonetic}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-2">Step 3: Function-based Interpretation</h2>
              <p>{results.functional}</p>
            </CardContent>
          </Card>

          {results.incantatory && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">Step 4: Incantatory or Ritual Interpretation</h2>
                <p>{results.incantatory}</p>
              </CardContent>
            </Card>
          )}

          {results.inferred && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">Step 5: AI Inference (Optional)</h2>
                <p>{results.inferred}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="pt-10 border-t mt-10 text-sm text-muted-foreground">
        <p>
          This tool interprets the transcribed text as a phonetic approximation of
          speech, assuming the writer may have had limited literacy, relied on
          sound-based encoding, and used syllabic or oral shorthand. It aims to
          approximate Romance-language roots, especially Old Spanish.
          Glyphs are treated as attempts to record pronounceable sound units,
          not formal spelling. Each decoding layer builds on the last.
        </p>
        <p className="mt-4">
          Optionally, an AI inference layer can assist with smoothing, expanding,
          and guessing symbolic or idiomatic meaning using GPT-based language
          modeling.
        </p>
      </div>
    </div>
  );
}
