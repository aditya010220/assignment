'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code2, Database, Cloud, Zap } from 'lucide-react'
import ConnectionLine from './ConnectionLine'

export default function InteractiveConnectionDemo() {
  const [activeConnections, setActiveConnections] = useState<string[]>([])

  const toggleConnection = (connectionId: string) => {
    setActiveConnections(prev => 
      prev.includes(connectionId) 
        ? prev.filter(id => id !== connectionId)
        : [...prev, connectionId]
    )
  }

  const cards = [
    { id: 'card-1', icon: <Code2 className="w-8 h-8" />, title: 'Development', color: 'from-blue-500 to-cyan-500' },
    { id: 'card-2', icon: <Database className="w-8 h-8" />, title: 'Database', color: 'from-green-500 to-emerald-500' },
    { id: 'card-3', icon: <Cloud className="w-8 h-8" />, title: 'Cloud', color: 'from-purple-500 to-pink-500' },
    { id: 'card-4', icon: <Zap className="w-8 h-8" />, title: 'Analytics', color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interactive{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connections
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Click the buttons below to see animated connection lines in action
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => toggleConnection('1-2')}
              variant={activeConnections.includes('1-2') ? 'default' : 'outline'}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Dev ↔ Database
            </Button>
            <Button
              onClick={() => toggleConnection('2-3')}
              variant={activeConnections.includes('2-3') ? 'default' : 'outline'}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Database ↔ Cloud
            </Button>
            <Button
              onClick={() => toggleConnection('3-4')}
              variant={activeConnections.includes('3-4') ? 'default' : 'outline'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Cloud ↔ Analytics
            </Button>
            <Button
              onClick={() => toggleConnection('1-4')}
              variant={activeConnections.includes('1-4') ? 'default' : 'outline'}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Dev ↔ Analytics
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={card.id}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:scale-105 group">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines */}
          {activeConnections.includes('1-2') && (
            <ConnectionLine 
              fromId="card-1"
              toId="card-2"
              color="#06b6d4"
              glowColor="#06b6d4"
              delay={0}
              duration={1.5}
            />
          )}
          
          {activeConnections.includes('2-3') && (
            <ConnectionLine 
              fromId="card-2"
              toId="card-3"
              color="#10b981"
              glowColor="#10b981"
              delay={0}
              duration={1.5}
            />
          )}
          
          {activeConnections.includes('3-4') && (
            <ConnectionLine 
              fromId="card-3"
              toId="card-4"
              color="#a855f7"
              glowColor="#a855f7"
              delay={0}
              duration={1.5}
            />
          )}
          
          {activeConnections.includes('1-4') && (
            <ConnectionLine 
              fromId="card-1"
              toId="card-4"
              color="#f97316"
              glowColor="#f97316"
              delay={0}
              duration={2}
            />
          )}
        </div>
      </div>
    </div>
  )
}
